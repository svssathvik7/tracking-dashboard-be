import express from "express";
import User from "../models/userModel.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }).select("-password");
  console.log(user); // Add this line to check the user object returned by the findOne() method
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  res.status(200).json({ message: "Login successful", data: user });
});

export default router;
