const Deal = require("../models/deal.model");
const User = require("../models/user.model");
const ApiError = require("../errors/ApiError");
const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");
const httpStatus = require("http-status");
const Message = require("../models/message.model");

// exports.makeDeal = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const artist = await User.findById(id);
//   if (!artist) {
//     throw new ApiError(404, "No User Found");
//   }

//   const user = await User.findById(req.user._id);
//   if (!user) {
//     throw new ApiError(404, "No User Found");
//   }

//   const result = await Deal.create({
//     artist: id,
//     user: req.user_id,
//     ...req.body,
//   });

//   const message = {
//     messageType: "Deal",
//     deal: result,
//     sender: req.user._id,
//     conversationId: req.body.conversationId,
//   };

//   const newMessage = await Message.create(message);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Deal Make successfully",
//     data: newMessage,
//   });
// });

exports.getUserDeal = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;
  const isExist = await User.findById(_id);
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!");
  }
  const deals = await Deal.find({
    $or: [{ user1: _id }, { user2: _id }],
  }).populate([
    { path: "user1", select: "_id firstName lastName image color" },
    { path: "user2", select: "_id firstName lastName image color" },
  ]);

  const result = deals.map((deal) => {
    const dealObj = deal.toObject();
    if (deal.user1._id.toString() === _id.toString()) {
      delete dealObj.user1;
    }
    if (deal.user2._id.toString() === _id.toString()) {
      delete dealObj.user2;
    }
    return dealObj;
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: false,
    message: "Deal retrieved by user ID",
    data: result,
  });
});

// exports.changeDealStatusToDB = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const { type } = req.query;

//   const deal = await Deal.findById(id);
//   if (!deal) {
//     throw new ApiError(404, "No Deal Found This Id");
//   }

//   const result = await Deal.findOneAndUpdate(
//     { _id: id },
//     { $set: { status: type } },
//     { new: true }
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: `Deal ${type} Successful`,
//     data: result,
//   });
// });
