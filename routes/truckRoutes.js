import express from "express";
import Tracking from "../models/trackingModel.js";
import workflowModel from "../models/workflowModel.js";
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

router.get("/get-all-checkpoints", async (req, res) => {
  try {
    const workflows = await workflowModel.find({});
    const uniqueStages = new Set();

    workflows.forEach((workflow) => {
      workflow.stages.forEach((stage) => {
        uniqueStages.add(stage.name);
      });
    });

    return res.status(200).json({ data: Array.from(uniqueStages) });
  } catch (error) {
    console.error("Error fetching checkpoints:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
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
    console.log("Searching index for ", checkpoint);
    const stageIndex = response.stages.findIndex(
      (stage) => stage.id == checkpoint
    );
    console.log(stageIndex, checkpoint, response.stages);
    if (!response.stages[stageIndex]) {
      return res.status(401).json({ error: "Checkpoint not found." });
    }

    if (isStart) {
      response.currentStage += 1;
      response.stages[stageIndex].start = Date.now();
    } else {
      response.currentStage += 1;
      response.stages[stageIndex].end = Date.now();
      if (stageIndex != response.stages.length - 1) {
        response.stages[stageIndex + 1].start = Date.now();
        response.currentStage += 1;
      } else {
        response.finished = true;
        response.currentStage = 2 * response.stages.length;
      }
    }

    await response.save();

    res.status(200).json({ success: true, message: "Timestamp updated." });
  } catch (error) {
    console.error("Error updating timestamp:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

export default router;
