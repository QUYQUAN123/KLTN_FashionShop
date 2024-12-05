const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const Shop = require("../models/shop");
const Application = require("../models/application");
const Product = require("../models/product");
const Order = require("../models/order");


exports.getShopStatistics = catchAsyncErrors(async (req, res, next) => {
    try {
      const totalShops = await Shop.countDocuments();
  
      const shops = await Shop.find();
  
      if (!shops || shops.length === 0) {
        return next(new ErrorHandler('No shops found', 404));
      }
      const shopStats = [];
      for (let i = 0; i < shops.length; i++) {
        const shop = shops[i];
        const application = await Application.findById(shop.applicationId)
          .select('shopInfor.shopName')
          .lean();
  
        if (!application) {
          return next(new ErrorHandler('Application data not found for shop ' + shop._id, 404));
        }
        const shopName = application.shopInfor.shopName;
        const products = await Product.find({ shopId: shop._id });
        const productCount = products.length;
        let totalQuantity = 0;
        products.forEach(product => {
          product.variants.forEach(variant => {
            totalQuantity += variant.totalStock;
          });
          totalQuantity += product.totalStock;
        });
  

        shopStats.push({
          shopId: shop._id,
          shopName: shopName, 
          productCount: productCount,  
          totalQuantity: totalQuantity, 
        });
      }
      res.status(200).json({
        success: true,
        totalShops,
        shopStats,
      });
    } catch (error) {
      next(error);
    }
  });

  exports.getRevenueAdmin = catchAsyncErrors(async (req, res, next) => {
    try {
      const succeededOrders = await Order.find({ orderStatus: 'Delivered' });
  
      if (!succeededOrders || succeededOrders.length === 0) {
        return res.status(200).json({
          success: true,
          revenueAdmin: 0,  
          totalOrders: 0,
        });
      }
  
      
      let totalRevenueAdmin = 0;
      let totalOrders = succeededOrders.length;
  
      succeededOrders.forEach(order => {
        order.revenue.forEach(revenueItem => {
          totalRevenueAdmin += revenueItem.revenueAdmin;  
        });
      });

      const revenueAdminFormatted = parseFloat(totalRevenueAdmin).toString();
      res.status(200).json({
        success: true,
        revenueAdmin: revenueAdminFormatted, 
        totalOrders: totalOrders,
      });
    } catch (error) {
      next(error);
    }
  });