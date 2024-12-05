const Coupon = require('../models/coupon');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const Shop = require("../models/shop");


exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
  const { percentage,maxDiscount, description, target, quantity, expiry } = req.body;

  const { role, _id: creatorId } = req.user;
  const newCoupon = await Coupon.create({
    percentage,
    maxDiscount,
    description,
    target,
    quantity,
    expiry,
    role,
    creatorId,
  });

  res.status(201).json({
    success: true,
    coupon: newCoupon,
  });
});


exports.updateCoupon = catchAsyncErrors(async (req, res, next) => {
  const { percentage, maxDiscount,description, target, quantity, expiry } = req.body;
  const { couponId } = req.params;

  let coupon = await Coupon.findById(couponId);
  if (!coupon) {
      return next(new ErrorHandler('Mã Giảm Giá Không Tồn Tại', 404));
  }

  coupon.percentage = percentage !== undefined ? percentage : coupon.percentage;
  coupon.maxDiscount = maxDiscount !== undefined ? maxDiscount : coupon.maxDiscount;
  coupon.description = description !== undefined ? description : coupon.description;
  coupon.target = target !== undefined ? target : coupon.target;
  coupon.quantity = quantity !== undefined ? quantity : coupon.quantity;
  coupon.expiry = expiry !== undefined ? expiry : coupon.expiry;

  await coupon.save();

  res.status(200).json({
      success: true,
      coupon
  });
});


exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  const { couponId } = req.params;
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
      return next(new ErrorHandler('Coupon not found', 404));
  }
  await Coupon.findByIdAndDelete(couponId);

  // Return success response
  res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully'
  });
});

exports.getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = Number(req.query.resPerPage) || 10;
  const currentPage = Number(req.query.page) || 1;
  const skip = resPerPage * (currentPage - 1);

  let query = Coupon.find();

  // Apply filters
  if (req.query.keyword) {
      query = query.or([
          { description: { $regex: req.query.keyword, $options: 'i' } },
          { target: { $regex: req.query.keyword, $options: 'i' } }
      ]);
  }

  if (req.query.status && req.query.status !== 'all') {
      query = query.where('status').equals(req.query.status);
  }

  if (req.query.role && req.query.role !== 'all') {
      query = query.where('role').equals(req.query.role);
  }
  const totalCoupons = await Coupon.countDocuments(query);
  const coupons = await query.skip(skip).limit(resPerPage);

  res.status(200).json({
      success: true,
      coupons,
      totalCoupons,
      resPerPage,
      currentPage
  });
});
exports.toggleStatus = catchAsyncErrors(async (req, res, next) => {
  const { couponId } = req.params;

  // Find the coupon by ID
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    return next(new ErrorHandler('Coupon not found', 404));
  }

  // Toggle the status
  coupon.status = coupon.status === "active" ? "inactive" : "active";

  await coupon.save();

  res.status(200).json({
    success: true,
    status: coupon.status,
    message: `Coupon is now ${coupon.status}`,
  });
});


exports.getActiveCoupons = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find({role:'admin', status: 'active' });

  if (!coupons) {
      return next(new ErrorHandler('No active coupons found', 404));
  }

  res.status(200).json({
      success: true,
      coupons
  });
});




exports.getCouponsOnShop = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = Number(req.query.resPerPage) || 10; 
  const currentPage = Number(req.query.page) || 1; 
  const skip = resPerPage * (currentPage - 1); 
  
  const creatorId = req.user.id; 
console.log("da",creatorId);

console.log("req.user.id:", req.user.id);
console.log("creatorId in database:", creatorId);

let query = Coupon.find({ creatorId });


  if (req.query.keyword) {
    query = query.or([
      { description: { $regex: req.query.keyword, $options: 'i' } },
      { target: { $regex: req.query.keyword, $options: 'i' } },
    ]);
  }

  if (req.query.status && req.query.status !== 'all') {
    query = query.where('status').equals(req.query.status);
  }

  const totalCoupons = await Coupon.countDocuments(query);

  const coupons = await query.skip(skip).limit(resPerPage);

  res.status(200).json({
    success: true,
    coupons,
    totalCoupons,
    resPerPage,
    currentPage,
  });
});


exports.getCouponsByShopId = catchAsyncErrors(async (req, res, next) => {
  const { shopId } = req.params;
  console.log("shopid",shopId);
  if (!shopId) {
    return res.status(400).json({
      success: false,
      message: "Shop ID is required."
    });
  }
  const shop = await Shop.findOne({ _id: shopId });

  if (!shop) {
    return res.status(404).json({
      success: false,
      message: "Shop not found."
    });
  }

  const creatorId = shop.ownerId; 
  const coupons = await Coupon.find({ creatorId , status: "active"});

  res.status(200).json({
    success: true,
    coupons,
  });
});
