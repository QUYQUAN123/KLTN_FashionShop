const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,  
    },
    discountValue: {
      type: Number,
      required: true, 
    },
    maxDiscount: {  
      type: Number,
      required: true,  
    },
    minPurchase: {
      type: Number,
      required: true, 
    },
    startDate: {
      type: String,
      required: true,  
    },
    endDate: {
      type: String,
      required: true,  
    },
    quantity: {
      type: Number,
      required: true,  
    },
    status: {
        type: String,
        required: true,  
        default: 'active',
      },
      createDate: {
        type: Date,
        required: true,  
      },
  },
  {
    timestamps: true,  
  }
);
module.exports = mongoose.model('voucher', voucherSchema);
