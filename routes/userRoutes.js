import express from "express";
import User from "../models/userModel.js";
const router = express.Router();

router.post("/create-operator", async (req, res) => {
  const { name, email, password, role, checkPointAssigned } = req.body;
  let operatorExists = await User.findOne({ email });
  if (operatorExists) {
    return res.status(400).json({ message: "Operator already exists" });
  }
  const newOperator = new User({
    name,
    email,
    password,
    role,
    checkPointAssigned,
  });
  await newOperator.save();
  res.status(201).json({ message: "Operator created successfully" });
});

router.get("/get-all-operators", async (req, res) => {
  const operators = await User.find({ role: "operator" });
  res.status(200).json({ data: operators });
});

router.get("/get-user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ email: id }).select("-password");
  return res.status(200).json({ data: user });
});

export default router;
