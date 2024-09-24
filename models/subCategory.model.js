const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    colors: [String],
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategorySchema = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategorySchema;
