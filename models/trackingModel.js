import mongoose from "mongoose";

const timestampSchema = new mongoose.Schema(
  {
    start: { type: Date, default: null },
    end: { type: Date, default: null },
  },
  { _id: false }
);

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
    timestamps: {
      entry_gate: timestampSchema,
      front_office: timestampSchema,
      weigh_bridge: timestampSchema,
      qc: timestampSchema,
      material_handling: timestampSchema,
      weigh_bridge_return: timestampSchema,
      front_office_return: timestampSchema,
      entry_gate_return: timestampSchema,
    },
  },
  { timestamps: true }
);

const Tracking = mongoose.model("tracking", trackingSchema);
export default Tracking;
