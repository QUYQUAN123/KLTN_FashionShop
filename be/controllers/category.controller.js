const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await categoryModel
        .find({})
        .sort({ createdAt: -1 })
        .populate("product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  home: async (req, res) => {
    try {
      const data = await categoryModel
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
      const data = await categoryModel
        .find({ _id: { $in: listId } })
        .populate("product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const data = await categoryModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

 
  update: async (req, res) => {
    try {
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      const currentProductIds = updatedCategory?.product || [];
      await productModel.updateMany(
        { categoryId: req.params.id, _id: { $nin: currentProductIds } },
        { $set: { categoryId: null } } 
      );
  
      return res.status(201).json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Lỗi khi cập nhật danh mục" });
    }
  },
  

  addProduct: async (req, res) => {
    try {
      const { listId } = req.body;
      const category = await categoryModel.findById(req.params.id);

      if (!category) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }

      const newProductIds = listId.filter(
        (productId) => !category.product.includes(productId)
      );
      category.product = [...category.product, ...newProductIds];
      const updatedCategory = await category.save();

      
      await productModel.updateMany(
        { _id: { $in: newProductIds } },
        { categoryId: category._id } 
      );

      res.status(201).json(updatedCategory);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào danh mục:", error);
      res.status(500).json({ message: "Có lỗi xảy ra khi thêm sản phẩm vào danh mục" });
    }
  },


  deleteCategory: async (req, res) => {
    try {
      const category = await categoryModel.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }
      if (category.product.length > 0) {
        return res
          .status(400)
          .json({ message: "Danh mục còn sản phẩm không thể xóa" });
      }
      await categoryModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      res.status(500).json({ message: "Có lỗi xảy ra khi xóa danh mục" });
    }
  },

};
