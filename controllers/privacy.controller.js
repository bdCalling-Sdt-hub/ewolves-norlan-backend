const PrivacyModel = require("../models/privacy.model");
const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");

exports.addPrivacy = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  let result;
  if (name && description) {
    result = await PrivacyModel.create({
      name: name,
      description: description,
    });
  }
  return sendResponse(res, 200, " Privacy And Policy Added Successfully");
});

exports.getPrivacy = catchAsync(async (req, res, next) => {
  const privacy = await PrivacyModel.find({});
  if (!privacy) {
    return sendResponse(res, 204, "No Data Found", privacy);
  }
  return sendResponse(res, 204, "Privacy Policy Date Fetch", privacy);
});

exports.updatePrivacy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const privacy = await PrivacyModel.findById(id);
  if (!privacy) {
    return sendResponse(res, 204, "No Data Found", privacy);
  }

  privacy.name = name ? name : privacy.name;
  privacy.description = description ? description : privacy.description;
  const result = await privacy.save();
  return sendResponse(res, 200, "Privacy Updated Successfully", result);
});
