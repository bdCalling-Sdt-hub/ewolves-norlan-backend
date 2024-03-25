const Event = require("../models/events.model");
const ApiError = require("../errors/ApiError");
const CatchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");
const httpStatus = require("http-status");
const fs = require("fs");
const path = require("path");

exports.createEvent = CatchAsync(async(req, res, next)=>{
    const { name } = req.body;

    let imageFileName = "";
    if (req.files && req.files.image && req.files.image[0]) {
        imageFileName = `/media/${req.files.image[0].filename}`;
    }

    const isExist = await Event.findOne({name: name});
    if(isExist){
        const filePath = path.join(__dirname, "..", "uploads", "media", imageFileName.split("/")[2]);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        throw new ApiError(204, "Event name already taken");
    }

    const result = await Event.create({ name: name, image: imageFileName });
    return sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Banner Added Successfully",
        data: result
    });

});

exports.getEvent = CatchAsync( async(req, res, next)=>{
    const events = await Event.find({});
    if(!events){
        throw new ApiError(404, "No Events Found");
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Events Data Retrive",
        data: events
    })
})