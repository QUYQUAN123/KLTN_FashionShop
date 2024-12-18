const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const voucherModel =require("../models/voucher.model")
const nodemailer = require("nodemailer");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await orderModel
        .find({})
        .sort({ createdAt: -1 })
        .populate("cart.product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      console.log("vouchervoucher:", data); 


      if (data?.voucherId) {
        const voucher = await voucherModel.findById(data.voucherId);
        await voucherModel.updateOne(
          { _id: voucher._id },
          { $inc: { quantity: -1 } }
        );
      }

      const payload = {
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
        note: data?.note,
        total: data?.total,
        voucherId: data?.voucherId,
        status: 'active',
        type: data?.type ?? 1,
        ...(data?.user?._id && { user: data?.user?._id }),
        cart: data?.cart?.map((e) => ({
          product: e?.info?._id,
          amount: e?.amount,
          type1: e?.type1,
          type2: e?.type2,
        })),
        
      };

      const validCart = [];
      for (const e of data?.cart) {
        const product = await productModel.findOne({ _id: e?.info?._id });
        if (product) {
          validCart.push(e);
        }
      }

      data.cart = validCart;

      for (const e of data?.cart) {
        const product = await productModel.findOne({ _id: e?.info?._id });
        if (!product) continue;

        if (product.amount < e.amount) {
          return res.status(200).json({
            status: 400,
            message: `Không đủ số lượng cho sản phẩm ${product.name}. Hiện chỉ còn ${product.amount}, yêu cầu ${e.amount}.`,
          });
        }
      }

      for (const e of data?.cart) {
        await productModel.updateOne(
          { _id: e?.info?._id },
          { $inc: { amount: -e.amount } }
        );
      }

      const order = await orderModel.create(payload);

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "quanvn9c1@gmail.com",
          pass: "yeskkhjwzqalbkei",
        },
      });

      await transporter.sendMail({
        from: "akingvietnam@gmail.com",
        to: "akingvietnam@gmail.com",
        subject: `A.Q - ĐƠN HÀNG MỚI`,
        html: `<h1>Đơn hàng A.Q</h1>
        <p>Mã đơn hàng: ${order?._id}</p>
        <p>Khách hàng: ${data?.name}</p>
        <p>Số điện thoại: ${data?.phone}</p>
        <p>Địa chỉ: ${data?.address}</p>
        <p>Ghi chú: ${data?.note}</p>
        <h3>Thông tin đơn hàng:</h3>
        <table style="border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid black; padding: 8px;">Tên sản phẩm</th>
            <th style="border: 1px solid black; padding: 8px;">Phân loại 1</th>
            <th style="border: 1px solid black; padding: 8px;">Phân loại 2</th>
            <th style="border: 1px solid black; padding: 8px;">Giá</th>
            <th style="border: 1px solid black; padding: 8px;">Số lượng</th>
            <th style="border: 1px solid black; padding: 8px;">Thành tiền</th>
          </tr>
          ${data?.cart
            .map(
              (item) => `
          <tr>
            <td style="border: 1px solid black; padding: 8px;">${
              item?.info?.name
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              item?.type1
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              item?.type2
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              item?.info?.discountPrice
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              item.amount
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              Number(item.amount) * Number(item?.info?.discountPrice)
            }</td>
          </tr>
        `
            )
            .join("")}
            <tr>
  <td style="border: 1px solid black; padding: 8px; font-weight:600" colspan="5">Tổng tiền</td>
  <td style="border: 1px solid black; padding: 8px; font-weight:600">${data?.total}</td>
</tr>

        </table>
        <p style="color: red;">Vui lòng vào website admin để xem thông tin chi tiết</p>
        `,
      });

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getByUserId: async (req, res) => {
    try {
      const data = await orderModel
        .find({ user: req.params.id })
        .populate("cart.product")
        .sort({ createdAt: -1 });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getById: async (req, res) => {
    try {
      let data = await orderModel
        .findById(req.params.id)
        .populate("cart.product");
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { status } = req.body;  
      const { id } = req.params;  
      const order = await orderModel.findById(id);
      if (!order) {
        return res.status(404).json({
          status: 404,
          message: "Đơn hàng không tồn tại.",
        });
      }
  
      if (status === 'cancel') {
        for (const item of order.cart) {
          const product = await productModel.findById(item.product);
          if (product) {
            await productModel.updateOne(
              { _id: item.product },
              { $inc: { amount: item.amount } }
            );
          }
        }
        if (order.voucherId && order.voucherId !== '0') {
          const voucher = await voucherModel.findById(order.voucherId);
          if (voucher) {
            await voucherModel.updateOne(
              { _id: voucher._id },
              { $inc: { quantity: 1 } }  
            );
          }
        }
        
      }
      if (status === 'complete') {
        order.type = 2;
      }
      order.status = status;
      await order.save();
  
      res.status(200).json({
        status: 200,
        message: "Cập nhật trạng thái đơn hàng thành công.",
        order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Lỗi khi cập nhật đơn hàng.",
      });
    }
  },
};