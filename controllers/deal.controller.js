const Deal = require("../models/deal.model");
const User = require("../models/user.model");
const ApiError = require("../errors/ApiError");
const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/CatchAsync");
const httpStatus = require("http-status");

exports.makeDeal= catchAsync(async(req, res, next)=>{
    const { id } = req.params;
    const { userId } = req.body;
    const artist = await User.findById(id);
    console.log(userId)
    if(!artist){
        throw new ApiError(404, "No User Found");
    }

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404, "No User Found");
    }

    const result = await Deal.create({
        artist:id,
        user: userId,  
        ...req.body
    });

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Deal Make successfully",
        data: result
    })
});