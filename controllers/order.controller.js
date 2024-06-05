const httpStatus = require("http-status");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");
const Order = require("../models/order.model");
const ApiError = require("../errors/ApiError");

exports.makeOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = {
    user: user._id,
    paymentStatus: "paid_to_admin",
    ...req.body,
  };

  const createOrder = await Order.create(payload);
  if (!createOrder) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to create order on database"
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order created successfully!",
    data: createOrder,
  });
});
