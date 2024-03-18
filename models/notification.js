const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    message: { type: String, required: false },
    image: { type: Object, required: false },
    type: { type: String, enum: ["payment", "unknown"], default: "unknown" },
    view: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["user", "artist", "admin"],
      default: ["user"],
    },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
