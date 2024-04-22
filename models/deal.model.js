const { Schema, model } = require("mongoose");

const dealSchema = new Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    total_service: {
      type: String,
      required: true,
    },
    event_date: {
      type: Date,
      required: true,
    },
    location: {
        type: String,
        required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: false,
      enum: ["Complete", "Pending", "Report" ],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Deal = model("Deal", dealSchema);

module.exports = Deal;
