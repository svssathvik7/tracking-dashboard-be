import express from "express";
import Tracking from "../models/trackingModel.js";
const router = express.Router();

router.post("/add-truck", async (req, res) => {
  const { trackingNumber, details, stages } = req.body;
  const newTruck = await Tracking({
    trackingNumber: trackingNumber,
    finished: false,
    details,
    stages,
  });
  await newTruck.save();
  return res.status(201).json({ message: "Created tracking successfully!" });
});

router.get("/get-all-trucks", async (req, res) => {
  const response = await Tracking.find({}).sort({ createdAt: -1 });
  return res.status(200).json({ data: response });
});

router.post("/update", async (req, res) => {
  try {
    const { trackingNumber, checkpoint, isStart } = req.body;

    const response = await Tracking.findOne({ trackingNumber });

    if (!response) {
      return res.status(404).json({ error: "Tracking record not found." });
    }

    if (!response.timestamps[checkpoint]) {
      return res.status(401).json({ error: "Checkpoint not found." });
    }

    const stageIndex = response.stages.indexOf(checkpoint);
    if (isStart) {
      response.currentStage += 1;
      response.stages[stageIndex].start = Date.now();
    } else {
      response.currentStage += 1;
      response.stages[stageIndex].end = Date.now();
      if (stageIndex != response.stages.length - 1){
        response.stages[stageIndex+1].start = Date.now();
      } else {
        response.finished = true;
      }
      response.currentStage += 1;
    }

    await response.save();

    res.status(200).json({ success: true, message: "Timestamp updated." });
  } catch (error) {
    console.error("Error updating timestamp:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

export default router;
