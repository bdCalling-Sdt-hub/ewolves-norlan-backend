const httpStatus = require("http-status");
const catchAsync = require("../shared/catchAsync");
const Community = require("../models/community.model");
const sendResponse = require("../shared/sendResponse");
const ApiError = require("../errors/ApiError");
const mongoose = require("mongoose");
const pick = require("../shared/pick");
const paginationCalculate = require("../helper/paginationHelper");

exports.createCommunity = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = { communityCreator: user._id, ...req.body };
  const result = await Community.create(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Community created successfully",
    data: result,
  });
});

exports.getCommunity = catchAsync(async (req, res) => {
  const user = req.user;
  const { searchTerm } = pick(req.query, ["searchTerm"]);
  const paginationOptions = pick(req.query, ["limit", "page"]);
  const { limit, skip, page } = paginationCalculate(paginationOptions);

  let andConditions = [];
  if (searchTerm) {
    andConditions.push({
      communityName: {
        $regex: searchTerm,
        $options: "i",
      },
    });
  }

  if (user.role === "USER") {
    andConditions.push({ communityCreator: user._id });
  } else {
    andConditions.push({ communityMembers: { $in: [user._id] } });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Community.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate({
      path: "communityMembers",
      select: "fullName _id image color",
    });

  const total = await Community.countDocuments(whereCondition);

  const totalPage = Math.ceil( total / limit);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Community retrieved successfully",
    pagination: { page, limit,totalPage, total },
    data: result,
  });
});

exports.updateCommunity = catchAsync(async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const { communityMembers } = req.body;
  const data = [...communityMembers];

  const community = await Community.findById(id);

  if (!community) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Community doesn't exist!");
  }

  if (user._id !== community.communityCreator.valueOf()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "you don't have access to add member"
    );
  }

  const updatedCommunity = await Community.findByIdAndUpdate(
    id,
    { $push: { communityMembers: data } },
    { new: true }
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member add successfully successfully",
    data: updatedCommunity,
  });
});

exports.removeCommunityMember = catchAsync(async (req, res) => {
  const user = req.user;
  const memberId = req.params.id;

  const community = await Community.findOne({
    communityCreator: user._id,
  });

  if (user._id !== community.communityCreator.valueOf()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "you don't have access to delete member"
    );
  }

  console.log(community._id);
  console.log(memberId);

  const updatedCommunity = await Community.findByIdAndUpdate(
    community._id,
    { $pull: { communityMembers: new mongoose.Types.ObjectId(memberId) } },
    { new: true }
  );

  if (!updatedCommunity) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to remove member"
    );
  }

  console.log("Updated Community:", updatedCommunity);

  console.log(updatedCommunity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Remove member from community",
    data: updatedCommunity,
  });
});
