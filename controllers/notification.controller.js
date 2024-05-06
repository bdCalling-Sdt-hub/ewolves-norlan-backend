const httpStatus = require("http-status");
const Notification = require("../models/notification.model");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");
const ApiError = require("../errors/ApiError");

exports.addNotification = async (payload) => {
  const result = await Notification.create(payload);
  return result;
};

exports.getNotification = catchAsync(async (req, res) => {
  const id = req.user;

  const notificationCheck = await Notification.findOne({ user: id });
  if (!notificationCheck) {
    throw new ApiError(404, "User notifications doesn't exist on the list");
  }

  const result = await Notification.find({ user: id }).sort({ createdAt: -1 });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification retrieved successfully",
    data: result,
  });
});
