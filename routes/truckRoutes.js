import express from "express";
import Tracking from "../models/trackingModel.js";
const router = express.Router();

router.post("/add-truck", async (req, res) => {
  const { trackingNumber, details } = req.body;
  const newTruck = await Tracking({
    trackingNumber: trackingNumber,
    finished: false,
    details,
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

let checkpoints = [
  "entry_gate",
  "front_office",
  "weigh_bridge",
  "qc",
  "material_handling",
  "weigh_bridge_return",
  "front_office_return",
  "entry_gate_return",
];

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

    if (isStart) {
      response.currentStage += 1;
      response.timestamps[checkpoint].start = Date.now();
    } else {
      response.currentStage += 1;
      const currentIndex = checkpoints.indexOf(checkpoint);
      response.timestamps[checkpoint].end = Date.now();
      response.timestamps[checkpoints[currentIndex + 1]].start = Date.now();
      response.currentStage += 1;
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
