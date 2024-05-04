const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const Gig = require("../models/gig.model");
const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");
const pick = require("../shared/pick");
const paginationCalculate = require("../helper/paginationHelper");
const Video = require("../models/video.model");
const User = require("../models/user.model");

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

  let createGig;
  if (value.thumbnail) {
    createGig = await Gig.create(value);
  }

  if (!createGig) {
    throw new ApiError(400, "Failed to created gig");
  }

  if (createGig) {
    const videoData = {
      video: `/media/${req.files.media[0].filename}`,
      location: createGig.location,
      videoDescription: createGig.about,
      price: createGig.basicPackage?.price,
      gig: createGig._id,
      artist: createGig.artist,
    };

    const createVideo = await Video.create(videoData);
    createGig.video = createVideo._id;
    await createGig.save();

    if (!createVideo) {
      await Gig.findByIdAndDelete(createGig._id);
      throw new ApiError(400, "Failed to created gig");
    }
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gig created Successfully",
    data: createGig,
  });
});

exports.getAllGigFromDB = catchAsync(async (req, res, next) => {
  const { interest } = await User.findById(req.user._id);
  const paginationOptions = pick(req.query, ["limit", "page"]);
  const { priceMin, priceMax } = pick(req.query, ["priceMin", "priceMax"]);
  const filters = pick(req.query, ["searchTerm", "category", "location"]);
  const { limit, page, skip } = paginationCalculate(paginationOptions);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) { 
    andConditions.push({
      $or: ["contentName", "location"].map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });

    andConditions.push({
      searchTags: {
        $elemMatch: {
          $regex: searchTerm,
          $options: "i",
        },
      },
    });
  }

  if (
    Object.keys(filterData).length &&
    filterData.category !== undefined &&
    filterData.location !== undefined
  ) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (priceMin && priceMax) {
    andConditions.push({
      "basicPackage.price": {
        $gte: priceMin,
        $lte: priceMax,
      },
    });
  }

  const whereConditions =
    andConditions.length > 0
      ? {
          $and: andConditions,
          searchTags: { $in: interest }
        }
      : { searchTags: { $in: interest } };

  const result = await Gig.find(whereConditions)
    .sort()
    .skip(skip)
    .limit(limit)
    .populate(["artist", "video"]);

  const total = await Gig.countDocuments(whereConditions);

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

exports.updateGigToDB = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const gig = await Gig.findById(id);
  if (!gig) {
    throw new ApiError(204, "No Gig Found");
  }
  const { contentName, location, skillLevel, searchTags, category, about } =
    req.body;

  let thumbnail = "";

  if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
    thumbnail = `/media/${req.files.thumbnail[0].filename}`;
  }

  if (thumbnail) {
    const fileName = gig?.thumbnail?.split("/").pop();
    const filePath = path.join(__dirname, "..", "uploads", "media", fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  gig.contentName = contentName ? contentName : gig.contentName;
  gig.about = about ? about : gig.about;
  gig.location = location ? location : gig.location;
  gig.skillLevel = skillLevel ? skillLevel : gig.skillLevel;
  gig.searchTags = searchTags ? searchTags : gig.searchTags;
  gig.category = category ? category : gig.category;
  gig.thumbnail = thumbnail ? thumbnail : gig.thumbnail;

  const result = await gig.save();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gig Updated successfully",
    data: result,
  });
});

exports.findGigByArtistId = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const result = await Gig.find({ artist: id }).sort({ createdAt: -1 });

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Artist gig retrieved successfully",
    data: result,
  });
});

exports.addRating = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { ratings } = req.body;
  const gig = await Gig.findById(id).populate("artist");

  if (!gig) {
    throw new ApiError(404, "Gig not Found");
  }
  const count = parseInt(gig?.ratings.count) + 1;
  const newRating =
    (parseInt(ratings) * count +
      parseInt(gig?.ratings.rate) * parseInt(gig?.ratings.count)) /
    (count + parseInt(gig?.ratings.count));

  const result = await Gig.findOneAndUpdate(
    { _id: id },
    { $set: { "ratings.rate": newRating.toString(), "ratings.count": count } },
    { new: true }
  );

  const artist = await User.findById(result.artist);
  if (!artist) {
    throw new ApiError(404, "User not Found");
  }

  const artistCount = parseInt(artist?.ratings.count) + 1;
  const artistRating =
    (parseInt(ratings) * count +
      parseInt(artist?.ratings.rate) * parseInt(artist?.ratings.count)) /
    (count + parseInt(artist?.ratings.count));

  const newResult = await User.findOneAndUpdate(
    { _id: result?.artist },
    {
      $set: {
        "ratings.rate": artistRating.toString(),
        "ratings.count": artistCount,
      },
    },
    { new: true }
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Added Rating Successfully",
    data: newResult,
  });
});

exports.gigByEventName = catchAsync(async (req, res, next) => {
  const { event } = req.query;
  let gig;
  if (event) {
    gig = await Gig.find({ event: event });
  } else {
    gig = await Gig.find({}).sort({ createdAt: -1 });
  }

  if (!gig) {
    throw new ApiError(404, "Gig not Found");
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrieve Gig Data Successfully",
    data: gig,
  });
});
