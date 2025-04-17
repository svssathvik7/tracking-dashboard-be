import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "operator"],
      required: true,
    },
    checkPointAssigned: [
      {
        type: String,
        enum: [
          "entry_gate",
          "front_office",
          "weigh_bridge",
          "qc",
          "material_handling",
          "weigh_bridge_return",
          "front_office_return",
          "entry_gate_return",
        ],
      },
    ],
    trucksAssigned: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
