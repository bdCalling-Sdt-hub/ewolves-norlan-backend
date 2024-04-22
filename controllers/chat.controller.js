const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");

exports.getChatByUserID= catchAsync(async(req, res, next)=>{
    const { senderId, receiverId } = req.params;

    const sender = await User.findById(senderId);
    if(!sender){
        throw new ApiError(404, "No User Found");
    }
    const receiver = await User.findById(receiverId);
    if(!receiver){
        throw new ApiError(404, "No User Found");
    }

    const query = {
        $or: [
            { $and: [{ sender: senderId }, { receiver: receiverId }] },
            { $and: [{ sender: receiverId }, { receiver: senderId }] },
        ],
    };
    
    const chat = await Chat.find(query);
    return sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        data: chat
    })
})

exports.getChatUserById = catchAsync(async(req, res, next)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user){
        throw new ApiError(404, "No User Found");
    }

    const userList = [];
    const result = (await Chat.find({sender: id}).populate("receiver")).map((item)=> {
        const isUserExist = userList.find(user => user._id === item.receiver._id );
        if (!isUserExist) {
            userList.push(item.receiver);
        }
    })

    if(!result){
        throw new ApiError(404, "No User Found");
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User list retrive successfully",
        data: userList
    })
})