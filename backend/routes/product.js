const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getShopProducts,
  uploadImages,
  getAdminProducts,
  updateProductBasic,
  getReviewsInProduct,
  getProductCategories,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/shop/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/shop/uploadImages")
  .post(isAuthenticatedUser, authorizeRoles("shopkeeper"), uploadImages);

router
  .route("/shop/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/shop/product/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductBasic);

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router
  .route("/shop/products")
  .get(isAuthenticatedUser, authorizeRoles("shopkeeper"), getShopProducts);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);
router.route("/ReviewsInProduct").get(getReviewsInProduct);
router.route("/admin/products").get(isAuthenticatedUser, getAdminProducts);
router.route("/product/coupon/categories").post(getProductCategories);

module.exports = router;
