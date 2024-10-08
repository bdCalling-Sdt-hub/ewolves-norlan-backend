const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
    },
    appId: {
      type: String,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: String,
      default: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708560000&semt=sph"
    },
    about: {
      type: String,
    },
    mobileNumber: {
      type: String,
      default: ""
    },
    location: {
      type: String,
    },
    instagramLink: {
      type: String,
    },
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
        default: "0", // Default value for rate
      },
      count: {
        type: Number,
        default: 0, // Default value for count
      },
    },
    color: {
      type: String,
      default: "0XFFFFFFFF",
    },
    interest: {
      type: Array,
    },
    accountInformation: {
      status: {
        type: Boolean,
        default: false,
      },
      stripeAccountId: {
        type: String,
      },
      externalAccountId: {
        type: String,
      },
      currency: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

//user check
userSchema.statics.isExistUser = async (id) => {
  const isExistUser = await User.findById(id);
  return isExistUser;
};

//account check
userSchema.statics.isAccountCreated = async (id) => {
  const isUserExist = await User.findById(id);
  return isUserExist.accountInformation.status;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
