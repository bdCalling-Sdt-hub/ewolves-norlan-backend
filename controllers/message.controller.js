const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");
const Message = require("../models/message.model");
const pick = require("../shared/pick");
const paginationCalculate = require("../helper/paginationHelper");

// created message
exports.createMessageToDB = catchAsync(async (req, res, next) => {
  const message = await Message.create({ ...req.body });
  console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Message Created Successfully",
    data: message,
  });
});

// get message by conversation ID
exports.getMessageFromDB = catchAsync(async (req, res, next) => {
  const paginationOptions = pick(req.query, ["limit", "page"]);
  const { skip, limit, page } = paginationCalculate(paginationOptions);
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Message.countDocuments({
    conversationId: req.params.conversationId,
  });

  if (!messages) {
    throw new ApiError(404, "There is no Message !");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Message Retrieve Successfully",
    pagination: { page, limit, total },
    data: messages,
  });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const message = await Message.findById(id);
  if (!message) {
    throw ApiError(404, "There is No Message !");
  }

  await Message.findByIdAndDelete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Message Deleted Successfully",
  });
});
