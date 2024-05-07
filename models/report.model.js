const { Schema, model } = require("mongoose");

const reportSchema = new Schema(
  {
    artist: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reportBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reportReasons: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Report = model("Report", reportSchema);
module.exports = Report;
