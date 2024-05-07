const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["comment", "wishlist"],
      required: true,
    },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["USER", "ARTIST", "ADMIN"],
      default: "USER",
    },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
