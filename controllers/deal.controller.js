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

exports.getDealByUserId= catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const { type } = req.query;
    const filter = type === "user" ? {user: id} : {artist: id};

    const deals = await Deal.find(filter).populate(["user", "artist"] );
    if(!deals){
        throw new ApiError(404, "No Deals Found By this ID");
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: false,
        message: "Deal retrive by user ID",
        data: deals
    })

})