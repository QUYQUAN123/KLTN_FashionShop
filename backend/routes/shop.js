const express = require("express");
const {
  uploadImages,
  updateShop,
  getShop,
  updateShopSection,
  deleteShopSection,
  getShopById,
  getAllProductsByShop
} = require("../controllers/shopController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/shop/section/upload/images")
  .post(isAuthenticatedUser, authorizeRoles("shopkeeper"), uploadImages);

router
  .route("/shop/me")
  .put(isAuthenticatedUser, authorizeRoles("shopkeeper"), updateShop)
  .get(isAuthenticatedUser, authorizeRoles("shopkeeper"), getShop);

router
  .route("/shop/section")
  .put(isAuthenticatedUser, authorizeRoles("shopkeeper"), updateShopSection)
  .delete(isAuthenticatedUser, authorizeRoles("shopkeeper"), deleteShopSection);

  router
  .route("/shop/:shopId")
  .get(getShopById);

router
  .route("/shop/:shopId/products")
  .get(getAllProductsByShop);

module.exports = router;
