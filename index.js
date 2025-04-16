import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import trackingRoutes from "./routes/truckRoutes.js";
import cors from "cors";
const app = express();
const port = 3000;

const dbUrl = process.env.DB || "mongodb://localhost:27017/factory-db";

const db = mongoose.connect(dbUrl);
db.then(() => {
  console.log("Connected to MongoDB");
});
db.catch((err) => {
  console.log("Error connecting to MongoDB", err);
});
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/track", trackingRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  return console.log(`Express is listening at ${port}`);
});
