import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    finished: {
      type: Boolean,
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    timestamps: {
      entry_gate: [
        {
          start: {
            type: Date,
          },
          end: {
            type: Date,
          },
        },
      ],
      front_office: [
        {
          start: {
            type: Date,
          },
          end: {
            type: Date,
          },
        },
      ],
      weigh_bridge: [
        {
          start: {
            type: Date,
          },
          end: {
            type: Date,
          },
        },
      ],
      qc: [
        {
          start: {
            type: Date,
          },
          end: {
            type: Date,
          },
        },
      ],
      material_handling: [
        {
          start: {
            type: Date,
          },
          end: {
            type: Date,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const Tracking = mongoose.model("tracking", trackingSchema);
export default Tracking;
