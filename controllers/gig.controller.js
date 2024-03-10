const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const Gig = require("../models/gig.model");
const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");
const pick = require("../shared/pick");
const paginationCalculate = require("../helper/paginationHelper");
const Video = require("../models/video.model");

exports.createGigToDB = catchAsync(async (req, res, next) => {
  const basicPackage = {
    serviceDescription: req.body.basicDes,
    price: req.body.basicPrice,
    totalService: req.body.basicTotalService,
  };
  const standardPackage = {
    serviceDescription: req.body.standardDes,
    price: req.body.standardPrice,
    totalService: req.body.standardTotalService,
  };
  const premiumPackage = {
    serviceDescription: req.body.premiumDes,
    price: req.body.premiumPrice,
    totalService: req.body.premiumTotalService,
  };

  const value = {
    thumbnail: `/media/${req.files.thumbnail[0].filename}`,
    basicPackage,
    standardPackage,
    premiumPackage,
    ...req.body,
  };

  let result;
  if (value.thumbnail) {
    result = await Gig.create(value);
  }

  if (!result) {
    throw new ApiError(400, "Failed to created gig");
  }

  if (result) {
    const videoData = {
      video: `/media/${req.files.media[0].filename}`,
      location: result.location,
      videoDescription: result.about,
      price: result.basicPackage?.price,
      gig: result._id,
      artist: result.artist,
    };

    const doc = await Video.create(videoData);
    result.video = doc._id;
    await result.save();
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gig created Successfully",
    data: result,
  });
});

exports.getAllGigFromDB = catchAsync(async (req, res, next) => {
  const paginationOptions = pick(req.query, ["limit", "page"]);
  const { limit, page, skip } = paginationCalculate(paginationOptions);

  const result = await Gig.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("video")
    .populate("artist");

  const total = await Gig.countDocuments();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All gig retrieved successfully",
    pagination: {
      page,
      limit,
      total,
    },
    data: result,
  });
});

exports.findGigByArtistId = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const result = await Gig.find({ artist: id }).sort({ createdAt: -1 });

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single artist gig retrieved successfully",
    data: result,
  });
});
