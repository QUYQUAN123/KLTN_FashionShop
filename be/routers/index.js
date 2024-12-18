const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");
const reviewRouter = require("./review.router");
const adminrouter = require("./admin.router");
const voucherRouter = require("./voucher.router");
const statisticalRouter = require("./statistical.router");
const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/product", productRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/admin", adminrouter);
  app.use("/api/review", reviewRouter);
  app.use("/api/voucher", voucherRouter);
  app.use("/api/statistical", statisticalRouter);

  app.use(errorHandle);
};
