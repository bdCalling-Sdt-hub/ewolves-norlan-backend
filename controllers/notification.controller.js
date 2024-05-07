const httpStatus = require("http-status");
const Notification = require("../models/notification.model");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");

exports.addNotification = async (payload) => {
  const result = await Notification.create(payload);
  return result;
};

exports.getNotification = catchAsync(async (req, res) => {
  const id = req.user._id;
  const result = await Notification.find({
    recipient: id,
    role: req.user.role,
  }).sort({
    createdAt: -1,
  });

  const total = await Notification.countDocuments({
    recipient: id,
    role: req.user.role,
    read: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification retrieved successfully",
    unreadNotifications: total,
    data: result,
  });
});

exports.readNotifications = catchAsync(async (req, res) => {
  const id = req.user._id;
  await Notification.updateMany(
    { recipient: id, role: req.user.role, read: false },
    { read: true }
  );

  const total = await Notification.countDocuments({
    recipient: id,
    role: req.user.role,
    read: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification read successfully",
    unreadNotifications: total,
  });
});
