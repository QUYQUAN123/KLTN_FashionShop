const express = require("express");
const router = express.Router();

const {
  login,
  create,
  list,
  deleteUser,
  findUser,
  update,
  lostPassword,
  loginGoogle,
} = require("../controllers/user.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/login").post(asyncMiddelware(login));
router.route("/login-google").post(asyncMiddelware(loginGoogle));
router.route("/lost-password").post(asyncMiddelware(lostPassword));
router.route("/:id").put(asyncMiddelware(update));
router.route("/:id").delete(asyncMiddelware(deleteUser));
router.route("/:id").get(asyncMiddelware(findUser));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
