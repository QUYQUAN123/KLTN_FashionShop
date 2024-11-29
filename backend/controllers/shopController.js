const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const Shop = require("../models/shop");
const Application = require("../models/application");
const Product = require("../models/product");
const { statsRecord } = require("../utils/statsHandler");

exports.uploadImages = catchAsyncErrors(async (req, res, next) => {
  let images = Array.isArray(req.body.images)
    ? req.body.images
    : [req.body.images];

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "test",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  const image = imagesLinks[0];

  res.status(201).json({
    success: true,
    image,
  });
});

exports.updateShop = catchAsyncErrors(async (req, res, next) => {
  const { newData, field } = req.body;
  let updateData = {};

  switch (field) {
    case "avatar":
      const result = await cloudinary.v2.uploader.upload(newData.url, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      updateData = {
        [field]: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      };
      break;
    case "cover":
        const coverResult = await cloudinary.v2.uploader.upload(newData.url, {
          folder: "covers",
          width: 1920, 
          crop: "scale",
        });
        updateData = {
          [field]: {
            public_id: coverResult.public_id,
            url: coverResult.secure_url,
          },
        };
        break;      
    case "sections":
      updateData = { $push: { sections: newData } };
      break;
    default:
      updateData = { [field]: newData };
  }

  await Shop.findOneAndUpdate({ ownerId: req.user.id }, updateData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getShop = catchAsyncErrors(async (req, res, next) => {

  let shop = await Shop.findOne({ ownerId: req.user.id }).lean();

  if (!shop) {
    return next(new ErrorHandler('Shop not found', 404));
  }
  const application = await Application.findById(shop.applicationId)
    .select('shopInfor.shopName')
    .lean();

  if (!application) {
    return next(new ErrorHandler('Application data not found', 404));
  }
  shop.shopName = application.shopInfor.shopName;
  for (let section of shop.sections) {
    const products = await Product.find({
      shopId: shop._id,
      category: section.categoryId,
    })
      .limit(5)
      .lean();
    section.products = products;
  }
  const shopData = application; 
  res.status(200).json({
    success: true,
    shop,
    shopData,
  });
});

exports.updateShopSection = catchAsyncErrors(async (req, res, next) => {
  const { newData, index } = req.body;

  await Shop.findOneAndUpdate(
    { ownerId: req.user.id },
    { $set: { [`sections.${index}`]: newData } },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.deleteShopSection = catchAsyncErrors(async (req, res, next) => {
  const { index } = req.body;

  const shop = await Shop.findOne({ ownerId: req.user.id });

  shop.sections.splice(index, 1);

  await shop.save();

  res.status(200).json({
    success: true,
  });
});



exports.getAllProductsByShop = catchAsyncErrors(async (req, res, next) => {
  const shopId = req.params.shopId;
  const products = await Product.find({ shopId })
    .lean() 
    .populate("category") 
    .sort({ createdAt: -1 }); 

  res.status(200).json({
    success: true,
    products,
  });
});
exports.getShopById = catchAsyncErrors(async (req, res, next) => {
  const { shopId } = req.params;

  // Tìm shop dựa trên shopId và lấy thông tin applicationId
  const shop = await Shop.findById(shopId)
    .select('applicationId avatar cover') // Lấy thêm avatar và cover từ bảng Shop
    .lean();

  if (!shop) {
    return next(new ErrorHandler('Shop not found', 404));
  }

  // Lấy thông tin từ bảng Application dựa trên applicationId
  const application = await Application.findById(shop.applicationId)
    .select('shopInfor.pickupAddress shopInfor.shopName shopInfor.ownerName')
    .lean();

  if (!application) {
    return next(new ErrorHandler('Application data not found', 404));
  }

  // Cấu trúc dữ liệu trả về cho shopData
  const shopData = {
    shopName: application.shopInfor.shopName,
    ownerName: application.shopInfor.ownerName,
    avatar: shop.avatar,  // Thêm avatar từ bảng Shop
    cover: shop.cover,    // Thêm cover từ bảng Shop
    pickupAddress: {
      contactName: application.shopInfor.pickupAddress.contactName,
      contactPhone: application.shopInfor.pickupAddress.contactPhone,
      address: {
        province: application.shopInfor.pickupAddress.address.province,
        district: application.shopInfor.pickupAddress.address.district,
        ward: application.shopInfor.pickupAddress.address.ward,
        detailed: application.shopInfor.pickupAddress.address.detailed,
      },
      email: application.shopInfor.pickupAddress.email,
      primaryPhone: application.shopInfor.pickupAddress.primaryPhone,
    },
  };

  // Trả về dữ liệu shop bao gồm avatar, cover và các thông tin khác
  res.status(200).json({
    success: true,
    shop: shopData,
  });
});



