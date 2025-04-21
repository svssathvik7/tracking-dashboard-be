import mongoose from "mongoose";

const workFlowScema = new mongoose.Schema({
  flowName: {
    type: String,
    required: true,
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
    },
  ],
});
