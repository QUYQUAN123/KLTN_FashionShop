const userModel = require("../models/user.model");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const reviewModel = require("../models/review.model");

module.exports = {
  item: async (req, res) => {
    try {
      const user = await userModel.countDocuments({});
      const order = await orderModel.countDocuments({});
      const product = await productModel.countDocuments({});

      const result = await orderModel.aggregate([
        {
          $group: {
            _id: null,
            totalSum: { $sum: "$total" },
          },
        },
      ]);

      const total = result[0]?.totalSum || 0;
      res.status(201).json({ user, order, product, total });
    } catch (error) {
      throw error;
    }
  },

  topProduct: async (req, res) => {
    try {
      const result = await orderModel.aggregate([
        // Giải nén mảng cart thành từng document riêng biệt
        { $unwind: "$cart" },

        // Gom nhóm theo sản phẩm và tính tổng amount và total tương ứng
        {
          $group: {
            _id: "$cart.product", // Gom theo ID sản phẩm
            totalAmount: { $sum: "$cart.amount" }, // Tổng amount (số lượng mua)
            totalPrice: { $sum: "$total" }, // Tổng total của các đơn chứa sản phẩm đó
          },
        },

        // Sắp xếp để lấy sản phẩm bán chạy nhất
        { $sort: { totalAmount: -1 } },

        // Giới hạn chỉ lấy sản phẩm top 1
        { $limit: 1 },

        // Lookup để lấy thông tin chi tiết sản phẩm từ bảng products
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        { $unwind: "$productInfo" },

        // Chọn các trường cần thiết
        {
          $project: {
            productId: "$_id",
            productName: "$productInfo.name",
            totalAmount: 1,
            totalPrice: 1, // Tổng total của sản phẩm đó
            _id: 0,
          },
        },
      ]);

      const top = result?.[0];

      const detail = await productModel.findById(top?.productId);
      const review = await reviewModel.countDocuments({
        product: top?.productId,
      });

      res
        .status(201)
        .json({ top, detail, review, totalSum: result?.[0]?.totalSum });
    } catch (error) {
      throw error;
    }
  },

  topUser: async (req, res) => {
    try {
      const result = await orderModel.aggregate([
        // Gom nhóm theo user và tính tổng total
        {
          $group: {
            _id: "$user", // Gom nhóm theo ID của user
            totalSpent: { $sum: "$total" }, // Tổng giá trị total cho mỗi user
            orderCount: { $sum: 1 }, // Tổng số đơn hàng của mỗi user
          },
        },

        // Sắp xếp theo tổng total giảm dần
        { $sort: { totalSpent: -1 } },

        // Lấy người dùng có tổng total cao nhất
        { $limit: 1 },

        // Lookup để lấy thông tin user từ collection user
        {
          $lookup: {
            from: "users", // Collection của user
            localField: "_id", // ID user từ kết quả $group
            foreignField: "_id", // Khớp với ID của user trong bảng users
            as: "userInfo", // Kết quả gán vào userInfo
          },
        },

        // Giải nén thông tin user
        { $unwind: "$userInfo" },

        // Chọn các trường cần thiết
        {
          $project: {
            userId: "$_id",
            userName: "$userInfo.name", // Lấy tên user từ bảng user
            totalSpent: 1,
            orderCount: 1,
            _id: 0,
          },
        },
      ]);

      const top = result?.[0];

      const review = await reviewModel.countDocuments({
        product: top?.userId,
      });

      res.status(201).json({ top, review });
    } catch (error) {
      throw error;
    }
  },
};
