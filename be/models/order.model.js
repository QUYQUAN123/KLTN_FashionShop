const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    note: {
      type: String,
    },

    type: {
      type: Number,
      default: 1,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        amount: { type: Number },
        type1: { type: String },
        type2: { type: String },
      },
    ],
    total: {
      type: Number,
      required: true, 
    },
    voucherId: {
      type: String,
      required: false,
      default: null,   
    },
    status: {  
      type: String,
      default: 'active', 
    },
    
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);



