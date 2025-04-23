import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import trackingRoutes from "./routes/truckRoutes.js";
import workFlowRoutes from "./routes/workflowRoutes.js";
import cors from "cors";
const app = express();
const port = 3000;

const dbUrl = process.env.DB;

const db = mongoose.connect(dbUrl);
db.then(() => {
  // createAdmin(); // Call the createAdmin function her
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
app.use("/workflows", workFlowRoutes);
app.get("/health", (req, res) => {
  return res.status(200).json({ status: true });
});
app.listen(port, () => {
  return console.log(`Express is listening at ${port}`);
});
