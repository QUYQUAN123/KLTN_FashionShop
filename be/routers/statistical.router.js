const express = require("express");
const router = express.Router();

const {
  item,
  topProduct,
  topUser,
} = require("../controllers/statistical.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/item").get(asyncMiddelware(item));
router.route("/top-product").get(asyncMiddelware(topProduct));
router.route("/top-user").get(asyncMiddelware(topUser));

module.exports = router;
