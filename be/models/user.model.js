const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    password: {
      type: String,
      require: true,
    },

    username: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

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

    // 0: user 1: admin
    role: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 1, 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
