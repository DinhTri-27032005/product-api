const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

// Cho phép đọc dữ liệu JSON từ request
app.use(express.json());

// Route cho Product
app.use("/api/products", productRoutes);

// Route kiểm tra hệ thống
app.get("/health", (req, res) => {
  const mongoStatus =
    mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected";

  res.status(200).json({
    status: "UP",
    mongodb: mongoStatus
  });
});

const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Product API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });