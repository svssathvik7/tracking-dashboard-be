import express from "express";
import Tracking from "../models/trackingModel.js";
const router = express.Router();

router.post("/add-truck/:id", async (req, res) => {
  const { id } = req.params;
  const newTruck = await Tracking({
    trackingNumber: id,
    finished: false,
  });
  await newTruck.save();
  return res.status(201).json({ message: "Created tracking successfully!" });
});

router.get("/get-all-trucks", async (req, res) => {
  const response = await Tracking.find({});
  return res.status(200).json({ data: response });
});

export default router;
