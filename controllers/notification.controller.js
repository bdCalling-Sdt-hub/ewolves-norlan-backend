const Notification = require("../models/notification");

exports.addNotification = async (payload) => {
  const result = await Notification.create(payload);
  return result;
};

exports.getAllNotifications = async () => {
  const result = await Notification.find().sort({ createdAt: -1 });
  return result;
};
