const ApiError = require("../errors/ApiError");
const Gig = require("../models/gig.model");
const CathcAsync = require("../shared/CatchAsync");
const sendResponse = require("../shared/sendResponse");

exports.createGigToDB = CathcAsync(async (req, res, next) => {
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
    media: `/media/${req.files.media[0].filename}`,
    thumbnail: `/media/${req.files.thumbnail[0].filename}`,
    basicPackage,
    standardPackage,
    premiumPackage,
    ...req.body,
  };

  let result;
  if (value.media && value.thumbnail) {
    result = await Gig.create(value);
  }

  if (!result) {
    throw new ApiError(400, "Failed to created gig");
  }
  return sendResponse(res, 200, "Gig created Successfully");
});
