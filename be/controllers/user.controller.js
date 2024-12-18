const userModel = require("../models/user.model");
const ErrorResponse = require("../helpers/ErrorResponse");
const nodemailer = require("nodemailer");

module.exports = {
  list: async (req, res) => {
    try {
      let user = await userModel
        .find({})
        .select(["-updatedAt", "-createdAt"])
        .sort({ createdAt: -1 });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  findUser: async (req, res) => {
    try {
      let user = await userModel
        .findById(req.params.id)
        .select(["-updatedAt", "-createdAt"]);
      return res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  },

  login: async (req, res) => {
    try {
      let { ...body } = req.body;
      let user = await userModel
        .findOne({
          username: body.username,
          password: body.password,
        })
        .select("-password");

      
      if (!user) {
        return res.status(200).json({
          status: 400,
          message: "Username hoặc mật khẩu không chính xác",
        });
      }
      if (user.status === 0) {
        return res.status(400).json({ message: "Tài khoản của bạn đã bị ngưng hoạt động vui lòng liên hệ shop để được mở khóa hoặc tạo tài khoản mới" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  lostPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({
        email,
      });

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "quanvn9c1@gmail.com",
          pass: "yeskkhjwzqalbkei",
        },
      });

      if (user) {
        await transporter.sendMail({
          from: "quanvn9c1@gmail.com",
          to: user?.email,
          subject: `A.Q - ĐỔI MẬT KHẨU`,
          html: `<h1>THAY ĐỔI MẬT KHẨU</h1>
          <p>click vào link sau để thay đổi mật khẩu: http://localhost:3000/reset-password/${user?._id}  </p>
          `,
        });
      }

      return res.status(200).json("Đã gởi mail thành công");
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  loginGoogle: async (req, res) => {
    try {
      let { ...body } = req.body;
      let user = await userModel.findOne({
        email: body.email,
      });

      if (!user) {
        const defaultPassword = "123";
        const data = await userModel.create({
          ...body,
          password: defaultPassword,
        });
        res.status(201).json(data);
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      let { ...body } = req.body;

      const existUsername = await userModel.findOne({
        username: body.username,
      });

      if (existUsername) {
        return res.status(200).json({
          status: 400,
          message: "Username đã tồn tại",
        });
      }

      const existEmail = await userModel.findOne({
        email: body.email,
      });

      if (existEmail) {
        return res.status(200).json({
          status: 400,
          message: "Email đã tồn tại",
        });
      }

      const data = await userModel.create(body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });

      const user = await userModel.findById(req.params.id).select("-password");
      res.status(201).json(user);
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (req, res) => {
    try {
      await userModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa user thành công");
    } catch (error) {
      throw error;
    }
  },
};
