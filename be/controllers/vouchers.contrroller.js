const voucherModel = require("../models/voucher.model"); // Import model voucher
const ErrorResponse = require("../helpers/ErrorResponse");

module.exports = {
  list: async (req, res) => {
    try {
      let vouchers = await voucherModel
        .find({})
        .sort({ createDate: -1 });
      return res.status(200).json(vouchers);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  findVoucher: async (req, res) => {
    try {
      let voucher = await voucherModel
        .findById(req.params.id);
      if (!voucher) {
        return res.status(404).json({
          status: 404,
          message: "Voucher không tồn tại",
        });
      }
      return res.status(200).json(voucher);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      let { ...body } = req.body;

      const existVoucher = await voucherModel.findOne({
        description: body.description,
      });

      if (existVoucher) {
        return res.status(200).json({
          status: 400,
          message: "Voucher này đã tồn tại",
        });
      }
      body.createDate =  new Date();
      const data = await voucherModel.create(body);
      res.status(201).json({message: "Tạo phiếu giảm giá thành công"});
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const updatedVoucher = await voucherModel.findByIdAndUpdate(req.params.id, {
        ...req.body,
      }, { new: true });

      if (!updatedVoucher) {
        return res.status(404).json({
          status: 404,
          message: "Voucher không tồn tại",
        });
      }

      res.status(200).json(updatedVoucher);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteVoucher: async (req, res) => {
    try {
      const deletedVoucher = await voucherModel.findByIdAndDelete(req.params.id);
      if (!deletedVoucher) {
        return res.status(404).json({
          status: 404,
          message: "Voucher không tồn tại",
        });
      }
      res.status(200).json("Xóa voucher thành công");
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  checkVoucher: async (req, res) => {
    try {
      const voucherId = req.params.id;
  
      let voucher = await voucherModel.findById(voucherId);
      if (!voucher) {
        return res.status(404).json({
          status: 404,
          message: "Voucher không tồn tại",
        });
      }
      if (voucher.quantity <= 0) {
        return res.status(400).json({
          status: 400,
          message: "Voucher đã hết số lượng sử dụng",
        });
      }
      const currentDate = new Date();
      const endDate = new Date(voucher.endDate);
  
      if (currentDate > endDate) {
        return res.status(400).json({
          status: 400,
          message: "Voucher đã hết hạn",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Voucher hợp lệ",
        voucher,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  
};
