const express = require("express");
const router = express.Router();

const {
  list,
  findVoucher,
  create,
  update,
  deleteVoucher,
  checkVoucher,
} = require("../controllers/vouchers.contrroller");


router.get("/", list);
router.get("/:id", findVoucher);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteVoucher);
router.get('/check/:id', checkVoucher);  

module.exports = router;
