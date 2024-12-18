import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { listVouchers } from "../../../../utils/api/voucher";

function VoucherCard({ voucher, onApply, total }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isVoucherValid = () => {
    const currentDate = new Date();
    const startDate = new Date(voucher.startDate);
    const endDate = new Date(voucher.endDate);
    
    return (
        total >= voucher.minPurchase &&
      currentDate >= startDate &&
      currentDate <= endDate
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '120px',
        backgroundColor: '#ffeb3b',
        borderRadius: '4px',
        display: 'flex',
        overflow: 'hidden',
        mb: 2,
        opacity: isVoucherValid() ? 1 : 0.5,
        '&::before': {
          content: '""',
          position: 'absolute',
          left: '25%',
          top: 0,
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          borderRadius: '0 0 50% 50%',
          transform: 'translateX(-50%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: '25%',
          bottom: 0,
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          borderRadius: '50% 50% 0 0',
          transform: 'translateX(-50%)',
        }
      }}
    >
      {/* Left section - Discount value */}
      <Box
        sx={{
          width: '25%',
          bgcolor: '#ff0000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        <Typography 
          variant="h3" 
          component="div" 
          fontWeight="bold"
          sx={{ lineHeight: 1 }}
        >
          {voucher.discountValue}%
        </Typography>
        <Typography 
          variant="body1" 
          textAlign="center"
          sx={{ mt: 1 }}
        >
          GIẢM GIÁ
        </Typography>
      </Box>

      {/* Right section - Details */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          position: 'relative',
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#d32f2f' }}>
          TẤT CẢ CÁC SẢN PHẨM
        </Typography>
        
        <Box>
          <Typography variant="body2" color="text.secondary">
            Giảm tối đa: {voucher.maxDiscount.toLocaleString()}đ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Đơn tối thiểu: {voucher.minPurchase.toLocaleString()}đ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            HSD: {formatDate(voucher.startDate)} - {formatDate(voucher.endDate)}
          </Typography>
        </Box>

        {isVoucherValid() ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => onApply(voucher)}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: '120px',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            ÁP DỤNG
          </Button>
        ) : (
          <Typography
            variant="body2"
            color="error"
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              textAlign: 'right'
            }}
          >
            {total < voucher.minPurchase 
              ? "Chưa đạt giá trị đơn tối thiểu"
              : "Voucher hết hạn"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function ModalVoucher({ open, handleClose, onApply, total }) {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await listVouchers();
        const activeVouchers = response.data.filter(
            (voucher) => voucher.status === "active" && voucher.quantity > 0
          );
        setVouchers(activeVouchers);
      } catch (error) {
        console.error(error);
      }
    };
    if (open) fetchVouchers();
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Chọn mã giảm giá
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Đơn hàng hiện tại: {total.toLocaleString()}đ
        </Typography>
      </DialogTitle>
      <DialogContent>
        {vouchers.length > 0 ? (
          vouchers.map((voucher) => (
            <VoucherCard
              key={voucher._id}
              voucher={voucher}
              onApply={onApply}
              total={total}
            />
          ))
        ) : (
          <Typography align="center" py={2}>
            Không có mã giảm giá khả dụng
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalVoucher;