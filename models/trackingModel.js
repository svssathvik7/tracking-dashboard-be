import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    currentStage: {
      type: Number,
      default: 0,
    },
    finished: {
      type: Boolean,
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    stages: [
      {
        id: {
          type: String,
          required: true,
          unique: true, // Ensure uniqueness of the ID s
        },
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
  },
  { timestamps: true }
);

const Tracking = mongoose.model("tracking", trackingSchema);
export default Tracking;
