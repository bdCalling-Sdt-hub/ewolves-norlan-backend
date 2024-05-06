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
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
    },
    status: {
      type: String
    },
  },
  { timestamps: true }
);

const Deal = model("Deal", dealSchema);

module.exports = Deal;
