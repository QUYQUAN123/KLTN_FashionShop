const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");
const orderModel = require("../models/order.model");
const mongoose = require("mongoose");

module.exports = {
  list: async (req, res) => {
    try {
      let query = { status: "active" };
      if (req?.query?.isNew) {
        query.isNew = req.query.isNew;
      }

      if (req?.query?.name) {
        query.name = { $regex: req.query.name, $options: "i" };
      }

      const data = await productModel.find(query);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  adminlist: async (req, res) => {
    try {
      let query = {};

      if (req?.query?.isNew) {
        query.isNew = req.query.isNew;
      }

      if (req?.query?.title) {
        query.title = { $regex: req.query.title, $options: "i" };
      }

      const data = await productModel.find(query);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("error: error.message", error.message);
    }
  },

  related: async (req, res) => {
    try {
      const categories = await categoryModel
        .find({
          product: mongoose.Types.ObjectId(req.params.id),
        })
        .populate("product");

      const arrProduct = [];
      categories.map((i) => {
        arrProduct.push([...i?.product]);
      }, []);

      const flatArrProduct = arrProduct.flat();

      const relatedProduct = flatArrProduct.filter(
        (i) => i?._id != req.params.id
      );

      const uniqueArray = [...new Set(relatedProduct)];

      const shuffleArray = (arr) => {
        const shuffledArray = [...arr];

        for (let i = shuffledArray?.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ];
        }

        return shuffledArray;
      };

      return res.status(201).json(shuffleArray(uniqueArray));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getTopView: async (req, res) => {
    try {
      const data = await productModel.find({}).sort({ views: -1 }).limit(8);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await productModel.findByIdAndUpdate(
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

  addViews: async (req, res) => {
    try {
      const data = await productModel.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true }
      );

      return res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const data = await productModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (req, res) => {
    try {


      const existingOrder = await orderModel.findOne({
        "cart.product": mongoose.Types.ObjectId(req.params.id), 
      });
  
      if (existingOrder) {
        return res.status(400).json({
          message: "Sản phẩm đã có trong đơn hàng, không thể xóa.",
        });
      }
  
      await productModel.findOneAndDelete({ _id: req.params.id });
      const categories = await categoryModel.find();
      for (const category of categories) {
        const listProduct = category?.product?.toString()?.split(",");

        if (listProduct.includes(req.params.id)) {
          category.product = listProduct.filter((id) => id !== req.params.id);
          await category.save();
        }
      }
      res.status(201).json("Xóa product thành công");
  
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      res.status(500).json({
        message: "Lỗi server, vui lòng thử lại sau.",
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const categories = await categoryModel.find({
        product: mongoose.Types.ObjectId(req.params.id),
      });

      const listCategory = categories?.map((e) => e?.name);

      const data = await productModel.findOne({ _id: req.params.id });

      res.status(201).json({ ...data.toObject(), listCategory });
    } catch (error) {
      throw error;
    }
  },
};
