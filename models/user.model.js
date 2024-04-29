const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
    },
    mobileNumber: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      required: false,
      trim: true,
    },
    instagramLink: { type: String, trim: true, required: false },
    accountStatus: { type: Boolean, default: false, required: false },
    profession: { type: String, trim: true, required: false },
    termAndCondition: { type: Boolean, default: false, required: false },
    role: {
      type: String,
      required: false,
      enum: ["UNKNOWN", "USER", "ARTIST", "ADMIN"],
      default: "USER",
    },
    emailVerified: { type: Boolean, default: false, required: false },
    emailVerifyCode: { type: String, required: false },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "DELETE"],
      default: "ACTIVE",
    },
    ratings: {
      rate: {
        type: String,
        default: "0" // Default value for rate
      },
      count: {
        type: Number,
        default: 0 // Default value for count
      }
    },
    color: {
      type:
       String,
       default:"0XFFFFFFFF"
      },
    interest:[]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
