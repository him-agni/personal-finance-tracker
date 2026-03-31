const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error(error);
    console.log(
      "⚠️  MongoDB not available. Check service and /server/.env MONGO_URI.",
    );
    // Do not exit to preserve server visibility for debugging,
    // but every DB operation should be guarded in controller
  }
};

module.exports = connectDB;
