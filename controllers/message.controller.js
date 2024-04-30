const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");
const Message = require("../models/message.model");

// created message 
exports.createMessageToDB = catchAsync( async(req, res, next)=>{
    const message = await Message.create({...req.body});
    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "Message Created Successfully",
        data: message
    })
});

// get message by conversation ID
exports.getMessageFromDB = catchAsync( async(req, res, next) =>{
    const messages = await Message.find({
        conversationId: req.params.conversationId
    });

    if(!messages){
        throw new ApiError(404, "There is no Message !");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "Message Retrieve Successfully",
        data: messages
    })
});