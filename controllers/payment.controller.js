const Payment = require("../models/payment.model");
const sendResponse= require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");
const ApiError = require("../errors/ApiError");

exports.getPaymentsByTimePeriod = catchAsync(async (req, res, next) => {
    const timePeriod = req.query.timePeriod || "day"; // default to day

    const pipeline = [
        {
        $match: {
            createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            },
        },
        },
        {
        $group: {
            _id: {
            [timePeriod]: {
                $dateTrunc: {
                date: "$createdAt",
                unit: timePeriod,
                },
            },
            },
            totalAmount: { $sum: "$amount" },
        },
        },
        {
        $project: {
            _id: 0,
            timePeriod: "$_id",
            totalAmount: 1,
        },
        },
    ];

    const result = await Payment.aggregate(pipeline);

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payments by time period",
        data: result,
    });
});