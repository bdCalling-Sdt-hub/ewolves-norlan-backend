const ApiError = require("../erorrs/ApiError");
const Gig = require("../models/gig.model");

exports.createGigToDB = async (req, res, next) => {
  try {
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

    return res.status(200).json({
      success: true,
      message: "Gig created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
