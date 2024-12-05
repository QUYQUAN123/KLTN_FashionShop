import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveCoupons, getCouponsByShopId } from '../../actions/couponActions';
import { getCategoryAll } from "../../actions/categoryActions";
import { formatToVNDWithVND } from "../../utils/formatHelper";

const DisplayCoupons = ({ onClose }) => {
    const dispatch = useDispatch();
    const { coupons, loading, error, couponsByShop } = useSelector(state => state.coupon);
    const [filteredAdminCoupons, setFilteredAdminCoupons] = useState([]);
    const [filteredShopCoupons, setFilteredShopCoupons] = useState([]);
    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const { categories } = useSelector((state) => state.category);
    useEffect(() => {
        dispatch(getActiveCoupons());
        dispatch(getCouponsByShopId("SHOP_1723385468288_gf585"));
        dispatch(getCategoryAll());
    }, [dispatch]);

    useEffect(() => {
        if (coupons.length > 0 || couponsByShop.length > 0) {
            const itemsToCoupon = JSON.parse(localStorage.getItem("itemsToCoupon")) || [];
            const categoryIds = [...new Set(itemsToCoupon.map(item => item.category))];

            // Lọc coupon admin
            const adminCoupons = coupons.filter(coupon => {
                if (coupon.target && coupon.target.type === "category") {
                    return coupon.target.ids.some(id => categoryIds.includes(id));
                }
                return false;
            });

            // Lọc coupon shop
            const shopCoupons = couponsByShop.filter(coupon => {
                if (coupon.target && coupon.target.type === "category") {
                    return coupon.target.ids.some(id => categoryIds.includes(id));
                }
                return false;
            });

            setFilteredAdminCoupons(adminCoupons);
            setFilteredShopCoupons(shopCoupons);
        }
    }, [coupons, couponsByShop]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleCouponSelection = (coupon) => {
        setSelectedCoupons(prevSelected => {
            const isAlreadySelected = prevSelected.some(c => c._id === coupon._id);
            
            if (isAlreadySelected) {
                return prevSelected.filter(c => c._id !== coupon._id); 
            } else {
                const sameCategoryAndRole = prevSelected.find(c => 
                    c.target.ids[0] === coupon.target.ids[0] && c.role === coupon.role
                );
        
                if (sameCategoryAndRole) {
                    return prevSelected.filter(c => !(c.target.ids[0] === coupon.target.ids[0] && c.role === coupon.role))
                        .concat(coupon);
                } else {
                    return [...prevSelected, coupon];
                }
            }
        });
    };
    
    const getCategoryName = (categoryIds) => {
        console.log("categoryIds", categoryIds);
        const Category = categories.find(cat => categoryIds.includes(cat._id));
        return Category ? Category.vietnameseName : '';
    };
    
    

    const handleApplyCoupons = () => {
        if (selectedCoupons.length > 0) {
            console.log('Applied coupons:', selectedCoupons);
            onClose(selectedCoupons);
        } else {
            onClose(); 
        }
    };

    return (
        <div className="coupon-modal-overlay">
            <div className="coupon-modal">
                <div className="coupon-modal-content">
                    <h1>Chọn Phiếu Giảm Giá</h1>
                    <div className="coupon-table">
                        {filteredAdminCoupons.length > 0 ? (
                            filteredAdminCoupons.map(coupon => (
                                
                                <div 
                                    key={coupon._id} 
                                    className={`coupon-row ${selectedCoupons.some(c => c._id === coupon._id) ? 'selected' : ''}`}
                                    onClick={() => handleCouponSelection(coupon)}
                                >
                                    <div className="coupon-content">
                                        <div className="coupon-checkbox">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedCoupons.some(c => c._id === coupon._id)}
                                                readOnly
                                            />
                                        </div>
                                        <div className="coupon-percentage">{coupon.percentage}%
                                        <p className="coupon-category">
                                                {getCategoryName(coupon.target.ids[0])} 

                                            </p>
                                        </div>
                                        <div className="coupon-details">
                                            <p className="coupon-description">{coupon.description}</p>
                                            <p className="coupon-type">Giảm tối đa: {formatToVNDWithVND(coupon.maxDiscount)}</p>
                                            <p className="coupon-quantity">Số lượng: {coupon.quantity}</p>
                                            <p className="coupon-expiry">Hạn sử dụng: {formatDate(coupon.expiry)}</p>
                                        </div>
                                    </div>
                                    <div className="coupon-code">COUPON</div>
                                </div>
                            ))
                        ) : (
                            <div className="no-coupons-message">
                                Không có phiếu giảm giá từ Admin.
                            </div>
                        )}
                    </div>

                    <div className="coupon-table" style={{ marginTop: '20px', backgroundColor: '#f9f4c8' }}>
                        {filteredShopCoupons.length > 0 ? (
                            filteredShopCoupons.map(coupon => (
                                <div 
                                    key={coupon._id} 
                                    className={`coupon-row ${selectedCoupons.some(c => c._id === coupon._id) ? 'selected' : ''}`}
                                    onClick={() => handleCouponSelection(coupon)}
                                    
                                >
                                    <div className="coupon-content">
                                        <div className="coupon-checkbox">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedCoupons.some(c => c._id === coupon._id)}
                                                readOnly
                                            />
                                        </div>
                                        <div className="coupon-percentage">{coupon.percentage}%
                                        <p className="coupon-category">
                                                {getCategoryName(coupon.target.ids[0])} 

                                            </p>
                                        </div>
                                        <div className="coupon-details">
                                            <p className="coupon-description">{coupon.description}</p>
                                            <p className="coupon-type">Giảm tối đa: {formatToVNDWithVND(coupon.maxDiscount)}</p>
                                            <p className="coupon-quantity">Số lượng: {coupon.quantity}</p>
                                            <p className="coupon-expiry">Hạn sử dụng: {formatDate(coupon.expiry)}</p>
                                        </div>
                                    </div>
                                    <div className="coupon-code">COUPON</div>
                                </div>
                            ))
                        ) : (
                            <div className="no-coupons-message">
                                Không có phiếu giảm giá từ Shop.
                            </div>
                        )}
                    </div>

                    <div className="button-group">
                        <button className="confirm-coupon-button" onClick={handleApplyCoupons}>
                            Áp dụng
                        </button>
                        <button className="close-coupon-button" onClick={onClose}>
                            Đóng
                        </button>
                    </div>

                    {loading && <p>Đang tải...</p>}
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default DisplayCoupons;
