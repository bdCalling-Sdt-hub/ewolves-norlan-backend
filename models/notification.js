const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    message: { type: String, required: false },
    image: { type: Object, required: false },
    type: {
      type: String,
      enum: ["payment", "term-and-conditions", "unknown"],
      default: "unknown",
    },
    view: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["USER", "ARTIST", "ADMIN"],
      default: ["user"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
