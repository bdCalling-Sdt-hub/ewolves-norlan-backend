const Banner = require("../models/bannerSchema"); // Corrected import statement
const fs = require("fs");
const path = require("path");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");

// add slider image
exports.addBanner = catchAsync(async (req, res, next) => {
  let imageFileName = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imageFileName = `/media/${req.files.image[0].filename}`;
  }

  const result = await Banner.create({ banner: imageFileName });
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner Added Successfully",
    data: result
  });
  return sendResponse(res, 204, "Banner Added Successfully", result);
});

// get all slider
exports.getBanner = catchAsync(async (req, res, next) => {
  const slider = await Banner.find({});
  if (!slider) {
    throw new ApiEroor
    return sendResponse(res, 204, "No Data Found", slider);
  }
  return sendResponse(res, 204, "Banner Data Fetch Successfully", slider);
});

// update single slider
exports.updateBanner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await Banner.findOne({ _id: id });
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
  return sendResponse(res, 200, "Banner Updated Successfully");
});

// delete a single slider
exports.deleteBanner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await Banner.findOne({ _id: id });
  if (!result) {
    return sendResponse(res, 204, "No Data Found", result);
  }

  const fileName = result?.slider?.split("/").pop();
  const filePath = path.join(__dirname, "..", "uploads", "image", fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    await Banner.findByIdAndDelete({ _id: id });
    return sendResponse(res, 200, "Banner Delete Successfully", result);
  }
});
