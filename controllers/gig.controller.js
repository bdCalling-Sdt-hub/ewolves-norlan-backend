const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const Gig = require("../models/gig.model");
const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");
const pick = require("../shared/pick");
const paginationCalculate = require("../helper/paginationHelper");

exports.createGigToDB = catchAsync(async (req, res, next) => {
  console.log("Connected");
  
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
    .limit(limit);

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

exports.updateGigToDB = catchAsync(async(req, res, next)=>{
  const {id} = req.params;
  const gig = await Gig.findById(id);
  if(!gig){
    throw new ApiError(204, "No Gig Found")
  }
  const { contentName, location, skillLevel, searchTags, subCategory, category, about } = req.body;

  let media = "";
  let thumbnail = "";

  if (req.files && req.files.thumbnail && req.files.thumbnail[0] ) {
    thumbnail = `/media/${req.files.thumbnail[0].filename}`;
  }

  if (req.files && req.files.media && req.files.media[0] ) {
    media = `/media/${req.files.media[0].filename}`;
  }

  if(media && thumbnail){
    const fileName = gig?.media?.split("/").pop();
    const fileName2 = gig?.thumbnail?.split("/").pop();
    const filePath1 = path.join(__dirname, '..', 'uploads', 'media', fileName);
    const filePath2 = path.join(__dirname, '..', 'uploads', 'media', fileName2);
    if (fs.existsSync(filePath1) && fs.existsSync(filePath2)) {
      fs.unlinkSync(filePath1);
      fs.unlinkSync(filePath2);
    }
  }

  gig.contentName = contentName ? contentName : gig.contentName;
  gig.about = about ? about : gig.about;
  gig.location = location ? location : gig.location;
  gig.skillLevel = skillLevel ? skillLevel :  gig.skillLevel;
  gig.searchTags = searchTags ? searchTags : gig.searchTags;
  gig.category = category ? category : gig.category;
  gig.subCategory = subCategory ? subCategory : gig.subCategory;
  gig.media = media ? media : gig.media;
  gig.thumbnail = thumbnail ? thumbnail : gig.thumbnail;

  const result = await gig.save();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gig Updated successfully",
    data: result,
  });
});