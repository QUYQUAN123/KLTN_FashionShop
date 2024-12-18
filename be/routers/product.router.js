const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deleteProduct,
  update,
  getById,
  addViews,
  getTopView,
  related,
} = require("../controllers/product.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/add-view/:id").patch(asyncMiddelware(addViews));
router.route("/related/:id").get(asyncMiddelware(related));
router.route("/top-view").get(asyncMiddelware(getTopView));
router.route("/:id").get(asyncMiddelware(getById));
router.route("/:id").delete(asyncMiddelware(deleteProduct));
router.route("/:id").patch(asyncMiddelware(update));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
