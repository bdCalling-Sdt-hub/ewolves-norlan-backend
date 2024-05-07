const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    user: { 
      name: {type: String, required: true},
      image:{type: String, required: true},
      color:{type: String, required: true} 
    },
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
