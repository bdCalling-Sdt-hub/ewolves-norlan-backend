const AboutModel = require("../models/about.model");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");

exports.addAboutUs = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  let result;
  if (name && description) {
    result = await AboutModel.create({
      name: name,
      description: description,
    });
  }
  return sendResponse(res, 200, "About Us Added Successfully", result);
});

exports.getAboutUs = catchAsync(async (req, res, next) => {
  const about = await AboutModel.find();
  if (!about) {
    return sendResponse(res, 204, "No Data Found", about);
  }
  return sendResponse(res, 200, "About Us fetch Successfully", about);
});

exports.updateAboutUs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const about = await AboutModel.findById(id);

  if (!about) {
    return sendResponse(res, 204, "No Data Found", about);
  }

  const { name, description } = req.body;
  about.name = name ? name : about.name;
  about.description = description ? description : about.description;
  const result = await about.save();
  return sendResponse(res, 200, "About Us updated Successfully", result);
});
