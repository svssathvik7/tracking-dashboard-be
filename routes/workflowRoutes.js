import express from "express";
import workflowModel from "../models/workflowModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { workflowName, stages } = req.body;

  const workFlow = new workflowModel({
    workflowName,
    stages,
  });
  await workFlow.save();
  res.status(200).json({ message: "Workflow created successfully" });
});

router.get("/get-all-workflows", async (req, res) => {
  const workflows = await workflowModel.find();
  res.status(200).json({ data: workflows });
});

export default router;
