import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
    },
    timestamps: {
      entry_gate: [
        {
          start: {
            type: Date,
            default: Date.now,
          },
          end: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      front_office: [
        {
          start: {
            type: Date,
            default: Date.now,
          },
          end: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      weigh_bridge: [
        {
          start: {
            type: Date,
            default: Date.now,
          },
          end: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      qc: {
        start: {
          type: Date,
          default: Date.now,
        },
        end: {
          type: Date,
          default: Date.now,
        },
      },
      material_building: {
        start: {
          type: Date,
          default: Date.now,
        },
        end: {
          type: Date,
          default: Date.now,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tracking", trackingSchema);
