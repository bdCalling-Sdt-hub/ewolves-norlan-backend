const Deal = require("../models/deal.model");
const User = require("../models/user.model");
const ApiError = require("../errors/ApiError");
const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");
const httpStatus = require("http-status");
const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

exports.makeDeal= catchAsync(async(req, res, next)=>{
    const { id } = req.params;
    const artist = await User.findById(id);
    if(!artist){
        throw new ApiError(404, "No User Found");
    }

    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(404, "No User Found");
    }

    const result = await Deal.create({
        artist:id,
        user: req.user_id,  
        ...req.body
    });

    const message = {
        messageType: "Deal",
        deal: result,
        sender: req.user._id,
        conversationId: req.body.conversationId
    }


    


    const newMessage = await Message.create(message);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Deal Make successfully",
        data: newMessage
    })
});

exports.getDealByUserId= catchAsync(async(req, res, next)=>{
    const {_id, role} = req.user;
    const type = role === "USER" ? {user: _id } : {artist: _id}

    let need;
    if(role === "USER"){
        need = {user: 0}
    }else{
        need = {artist: 0}
    }

    const deals =  await Deal.find(type, need).populate(["artist","user"]);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: false,
        message: "Deal retrive by user ID",
        data: deals
    })

})

exports.getDealDetailsByID= catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const deal =  await Deal.findById(id).populate("user").select("fullName _id image color")
    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: false,
        message: "Retrieved Deal Details",
        data: deal
    })

})

exports.changeDealStatusToDB = catchAsync(async(req, res, next)=>{
    const { id } = req.params;
    const { type } = req.query;

    const deal = await Deal.findById(id);
    if(!deal){
        throw new ApiError(404, "No Deal Found This Id");
    }

    const result = await Deal.findOneAndUpdate(
        {_id: id}, 
        {$set: {status : type}},
        {new: true}
    )
    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Deal ${type} Successful`,
        data: result
    })
});