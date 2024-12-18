const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "active",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },    
    name: {
      type: String,
      require: true,
    },

    discountPrice: {
      type: Number,
    },

    price: {
      type: Number,
    },

    label: {
      type: String,
    },

    description: {
      type: String,
    },

    struct: {
      type: String,
    },

    img1: {
      type: String,
    },

    img2: {
      type: String,
    },

    img3: {
      type: String,
    },

    img4: {
      type: String,
    },

    img5: {
      type: String,
    },

    img6: {
      type: String,
    },

    img7: {
      type: String,
    },

    img8: {
      type: String,
    },

    img9: {
      type: String,
    },

    img10: {
      type: String,
    },

    nameFirstType: {
      type: String,
    },

    firstType: [
      {
        type: String,
      },
    ],

    firstTypeUrl1: {
      type: String,
    },

    firstTypeUrl2: {
      type: String,
    },

    firstTypeUrl3: {
      type: String,
    },

    firstTypeUrl4: {
      type: String,
    },

    firstTypeUrl5: {
      type: String,
    },

    firstTypeUrl6: {
      type: String,
    },

    firstTypeUrl7: {
      type: String,
    },
    firstTypeUrl8: {
      type: String,
    },
    firstTypeUrl9: {
      type: String,
    },
    firstTypeUrl10: {
      type: String,
    },

    nameSecondType: {
      type: String,
    },

    secondType: [
      {
        type: String,
      },
    ],

    secondTypeUrl1: {
      type: String,
    },

    secondTypeUrl2: {
      type: String,
    },

    secondTypeUrl3: {
      type: String,
    },

    secondTypeUrl4: {
      type: String,
    },

    secondTypeUrl5: {
      type: String,
    },

    secondTypeUrl6: {
      type: String,
    },

    secondTypeUrl7: {
      type: String,
    },
    secondTypeUrl8: {
      type: String,
    },
    secondTypeUrl9: {
      type: String,
    },
    secondTypeUrl10: {
      type: String,
    },
    amount: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
