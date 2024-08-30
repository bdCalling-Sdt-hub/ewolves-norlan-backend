const httpStatus = require("http-status");
const TermsModel = require("../models/terms.model");
const sendResponse = require("../shared/sendResponse");
const {
  addNotification,
  getAllNotifications,
} = require("./notification.controller");
const catchAsync = require("../shared/CatchAsync");

exports.addTerms = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  let result;
  if (name && description) {
    result = await TermsModel.create({
      name: name,
      description: description,
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Terms And condition Added Successfully",
    data: result,
  });
});

exports.getTerms = catchAsync(async (req, res, next) => {
  const terms = await TermsModel.findOne().sort({ createdAt: -1 });
  if (!terms) {
    return sendResponse(res, 204, "No Data Found", terms);
  }
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Terms And Condition Fetch Data Successfully",
    data: terms,
  });
});

exports.updateTerms = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const terms = await TermsModel.findById(id);
  if (!terms) {
    return sendResponse(res, 204, "No Data Found", terms);
  }

  terms.name = name ? name : terms.name;
  terms.description = description ? description : terms.description;
  const result = await terms.save();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Terms and Condition Updated Successfully",
    data: result,
  });
});
