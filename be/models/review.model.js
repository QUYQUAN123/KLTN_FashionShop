const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      require: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewSchema);
