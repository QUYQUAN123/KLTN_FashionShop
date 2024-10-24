const { app, server, io, userSockets } = require("./app");
const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

connectDatabase();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server start on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`);
});

const payment = require("./controllers/paymentController");
const notify = require("./controllers/applicationController");

payment.setIo(io);
notify.setIo(io, userSockets);

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
