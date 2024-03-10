const SliderModel = require("../models/sliderSchema"); // Corrected import statement
const fs = require("fs");
const path = require("path");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");

// add slider image
exports.addSlider = catchAsync(async (req, res, next) => {
  let imageFileName = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imageFileName = `/media/${req.files.image[0].filename}`;
  }

  const result = await SliderModel.create({ slider: imageFileName });
  return sendResponse(res, 204, "Slider Added Successfully", result);
});

// get all slider
exports.getSlider = catchAsync(async (req, res, next) => {
  const slider = await SliderModel.find({});
  if (!slider) {
    return sendResponse(res, 204, "No Data Found", slider);
  }
  return sendResponse(res, 204, "Slider Data Fetch Successfully", slider);
});

// update single slider
exports.updateSlider = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await SliderModel.findOne({ _id: id });
  if (!result) {
    return sendResponse(res, 204, "No Data Found", result);
  }

  const fileName = result?.slider?.split("/").pop();
  const filePath = path.join(__dirname, "..", "uploads", "media", fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  let imageFileName = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imageFileName = `/media/${req.files.image[0].filename}`;
  }

  result.slider = imageFileName;
  await result.save();
  return sendResponse(res, 200, "Slider Updated Successfully");
});

// delete a single slider
exports.deleteSlider = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await SliderModel.findOne({ _id: id });
  if (!result) {
    return sendResponse(res, 204, "No Data Found", result);
  }

  const fileName = result?.slider?.split("/").pop();
  const filePath = path.join(__dirname, "..", "uploads", "image", fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    await SliderModel.findByIdAndDelete({ _id: id });
    return sendResponse(res, 200, "Slider Delete Successfully", result);
  }
});
