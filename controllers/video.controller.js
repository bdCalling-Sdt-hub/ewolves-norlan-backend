const Gig = require("../models/gig.model");
const User = require("../models/user.model");
const Video = require("../models/video.model");
const sendResponse = require("../shared/sendResponse");
const CatchAsync = require("../shared/CatchAsync");
const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");

exports.createComment = CatchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const {userId, comment} = req.body; 
    const video = await Video.findById(id);

    if(!video){
        throw new ApiError(204, "No Video Found");
    }
    
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(204, "No User Found");
    }

    let result;
    if(comment){
        const value= {
            user : userId,
            comment: comment
        }
        video.comments.push(value);
        result = await video.save();
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Put a Comment",
        data: result,
    });
})


exports.createWishList = CatchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const {userId} = req.body; 
    const video = await Video.findById(id);

    if(!video){
        throw new ApiError(204, "No Video Found");
    }
    
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(204, "No User Found");
    }
    
    video.wishList.push(userId);
    const result = await video.save();
    

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Put a wish",
        data: result,
    });
})