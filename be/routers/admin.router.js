const express = require("express");
const router = express.Router();

const {

  adminlist,
} = require("../controllers/product.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");


router.route("/productAdmin").get(asyncMiddelware(adminlist));



module.exports = router;