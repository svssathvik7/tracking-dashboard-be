import express from "express";
import Tracking from "../models/trackingModel.js";
const router = express.Router();

router.post("/add-truck/:id", async (req, res) => {
  const { id } = req.params;
  const newTruck = await Tracking({
    trackingNumber: id,
    finished: false,
    timestamps: {
      entry_gate: {
        start: null,
        end: null,
      },
      front_office: { start: null, end: null },
      weigh_bridge: { start: null, end: null },
      qc: { start: null, end: null },
      material_handling: { start: null, end: null },
      weigh_bridge_return: { start: null, end: null },
      front_office_return: { start: null, end: null },
      entry_gate_return: { start: null, end: null },
    },
  });
  await newTruck.save();
  return res.status(201).json({ message: "Created tracking successfully!" });
});

router.get("/get-all-trucks", async (req, res) => {
  const response = await Tracking.find({});
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
      response.timestamps[checkpoint] = [];
    }

    if (response.timestamps[checkpoint].length >= index + 1) {
      if (isStart) {
        response.currentStage += 1;
        response.timestamps[checkpoint].start = Date.now();
      } else {
        response.currentStage += 1;
        response.timestamps[checkpoint].end = Date.now();
      }
    } else {
      // Create empty entries up to the index
      if (isStart) {
        response.currentStage += 1;
        response.timestamps[checkpoint].start = Date.now();
      } else {
        response.currentStage += 1;
        response.timestamps[checkpoint].end = Date.now();
      }
    }
    if (response.currentStage == 16) {
      response.finished = true;
    }

    await response.save();

    res.status(200).json({ success: true, message: "Timestamp updated." });
  } catch (error) {
    console.error("Error updating timestamp:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

export default router;
