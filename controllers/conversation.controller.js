const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const Conversation = require("../models/conversation.model");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");

exports.createConversationToDB  = catchAsync( async(req, res, next)=>{
    const conversation = new Conversation({
        members: [ req.body.senderId, req.body.receiverId ]
    });
    const result = await conversation.save();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "Conversation Created Successfully",
        data: result
    })
});

exports.getConversationsFromDB = catchAsync( async (req, res, next)=>{
    const conversations = await Conversation.find({
        members: { $in: [req.params.userId] }
    }).populate({ path: "members", select: "fullName _id image color"});

    if(!conversations){
        throw new ApiError(404, "There is no User!");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "Conversation Retrieve Successfully",
        data: conversations
    })
});

exports.getSingleConversationFromDB = catchAsync( async (req, res, next)=>{

    const conversation = await Conversation.findOne({
        members: { $all: [ req.params.firstUserId, req.params.secondUserId ] }
    }).populate({ path: "members", select: "fullName _id image color"});

    if(!conversation){
        throw new ApiError(404, "There is no Conversation!");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "Single Conversation Retrieve Successfully",
        data: conversation
    })
});