const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deleteReview,
  update,
  getById,
  home,
  findOne,
  findByProduct,
} = require("../controllers/review.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/:id").patch(asyncMiddelware(update));
router.route("/find-one").get(asyncMiddelware(findOne));
router.route("/find-by-product/:id").get(asyncMiddelware(findByProduct));
router.route("/home").get(asyncMiddelware(home));
router.route("/:id").delete(asyncMiddelware(deleteReview));
router.route("/:id").get(asyncMiddelware(getById));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
