const { Schema, model } = require("mongoose");

const communityModel = new Schema(
  {
    communityCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    communityName: {
      type: String,
      required: true,
    },
    communityMembers: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Community = model("Community", communityModel);
module.exports = Community;
