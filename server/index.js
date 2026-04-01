const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // req.body me data lana

app.get("/", (req, res) => res.send("API running"));
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;
