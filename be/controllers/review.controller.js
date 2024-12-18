const reviewModel = require("../models/review.model");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await reviewModel
        .find({})
        .sort({ createdAt: -1 })
        .populate("product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  findByProduct: async (req, res) => {
    try {
      const data = await reviewModel
        .find({ product: req.params.id })
        .sort({ createdAt: -1 })
        .populate("product")
        .populate("user")
        .populate("order");

      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  findOne: async (req, res) => {
    try {
      let query = {};

      if (req?.query?.user) {
        query.user = req.query.user;
      }

      if (req?.query?.order) {
        query.order = req.query.order;
      }

      if (req?.query?.product) {
        query.product = req.query.product;
      }

      const data = await reviewModel.findOne(query);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  home: async (req, res) => {
    try {
      const data = await reviewModel
        .find({})
        .sort({ displayOrder: -1, createdAt: -1 })
        .populate({
          path: "product",
          options: { limit: 6 },
        });
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  getById: async (req, res) => {
    try {
      const listId = req?.params?.id?.split("-");
      const data = await reviewModel
        .find({ _id: { $in: listId } })
        .populate("product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const data = await reviewModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await reviewModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  addProduct: async (req, res) => {
    try {
      const { listId } = req.body;

      const category = await reviewModel.findById(req.params.id);

      const newProductIds = listId.filter(
        (productId) => !category.product.includes(productId)
      );
      category.product = [...category.product, ...newProductIds];

      const updatedCategory = await category.save();

      res.status(201).json(updatedCategory);
    } catch (error) {
      throw error;
    }
  },

  deleteReview: async (req, res) => {
    try {
      await reviewModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa review thành công");
    } catch (error) {
      throw error;
    }
  },
};
