import mongoose from "mongoose";

const workflowSchema = new mongoose.Schema({
  workflowName: {
    type: String,
    required: true,
    unique: true,
  },
  stages: [
    {
      name: {
        type: String,
        required: true,
      },
      stageNumber: {
        type: Number,
        required: true,
      },
      start: {
        type: Date,
        default: null,
      },
      end: {
        type: Date,
        default: null,
      },
    },
  ],
});

export default mongoose.model("workflow", workflowSchema);
