const express = require("express");
const router = express.Router();

const {
  create,
  getByUserId,
  update,
  list,
  getById,
} = require("../controllers/order.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/").post(asyncMiddelware(create));
router.route("/get-by-user/:id").get(asyncMiddelware(getByUserId));
router.route("/:id").get(asyncMiddelware(getById));
router.route("/").get(asyncMiddelware(list));
router.route("/update/:id").put(asyncMiddelware(update));  


module.exports = router;
