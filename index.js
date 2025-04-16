import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
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
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  return console.log(`Express is listening at ${port}`);
});
