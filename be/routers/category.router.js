const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deleteCategory,
  addProduct,
  update,
  getById,
  home,
} = require("../controllers/category.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/:id").patch(asyncMiddelware(update));
router.route("/add-product/:id").put(asyncMiddelware(addProduct));
router.route("/home").get(asyncMiddelware(home));
router.route("/:id").delete(asyncMiddelware(deleteCategory));
router.route("/:id").get(asyncMiddelware(getById));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
