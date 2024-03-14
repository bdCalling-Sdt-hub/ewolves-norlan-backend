const CategoryModel = require("../models/categorySchema");
const fs = require("fs");
const path = require("path");
const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");
const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");

// add category
exports.addCategory = catchAsync(async (req, res, next) => {
  const { name, primary_color, secondary_color } = req.body;
  let imageFileName = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imageFileName = `/media/${req.files.image[0].filename}`;
  }
  const result = await CategoryModel.create({
    name: name,
    primary_color: primary_color,
    secondary_color: secondary_color,
    image: imageFileName,
  });
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Created a new Category",
    data: result
  });
});

// fetch category
exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await CategoryModel.find({});
  if (!category) {
    throw new ApiError(404, "No Category Found")
  }
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Data retrive successfully",
    data: category
  });
});

// get single category
exports.getSingleCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findOne({ _id: id });
  if (!category) {
    throw new ApiError(404, "No Category Found")
  }
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Single Category Retrive",
    data: category
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findOneAndDelete({ _id: id });
  if (!category) {
    throw new ApiError(404, "No Category Found")
  }
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Delete Successfully",
    data: category
  });
});

// update category
exports.updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findOne({ _id: id });
  if (!category) {
    throw new ApiError(404, "No Category Found")
  }

  const { name, primary_color, secondary_color } = req.body;
  let imageFileName = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imageFileName = `/media/${req.files.image[0].filename}`;
  }

  const fileName = category?.image?.split("/").pop();
  const filePath = path.join(__dirname, "..", "uploads", "media", fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  (category.name = name ? name : category.name),
    (category.primary_color = primary_color
      ? primary_color
      : category.primary_color),
    (category.secondary_color = secondary_color
      ? secondary_color
      : category.secondary_color),
    (category.image = imageFileName ? imageFileName : category.image);
  const result = await category.save();
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Updated Successfully",
    data: result
  });
});



exports.addSubCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    throw new ApiError(404, "No Sub Category Found")
  }

  const { name, color } = req.body;

  let imageFileName = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imageFileName = `/media/${req.files.image[0].filename}`;
  }

  const value = {
    name: name,
    color: color,
    image: imageFileName,
  };

  category.sub_category.push(value);
  const newCategory = await category.save();
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Sub Category Added Successfully",
    data: newCategory
  });
});

exports.getSubCategory = catchAsync(async (req, res, next) => {
  const { catId, subId } = req.params;
  const category = await CategoryModel.findById(catId);
  const subCategory = category.sub_category.id(subId);
  if (!subCategory) {
    throw new ApiError(404, "No Sub Category Found")
  }
  
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Sub Category Details Retrive Successfully",
    data: subCategorycategory
  });
});

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
  const { catId, subId } = req.params;
  const category = await CategoryModel.findById(catId);
  const subCategory = category.sub_category.id(subId);
  if (!subCategory) {
    throw new ApiError(404, "No Category Found")
  }

  const fileName = subCategory?.image?.split("/").pop();
  const filePath = path.join(__dirname, "..", "uploads", "media", fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  subCategory.deleteOne();
  const data = await category.save();
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Sub Category Item Successfully",
    data: data
  });
});

exports.updateSubCategory = catchAsync(async (req, res, next) => {
  const { catId, subId } = req.params;
  const category = await CategoryModel.findById(catId);
  const subCategory = category.sub_category.id(subId);
  if (!subCategory) {
    throw new ApiError(404, "No Category Found")
  }

  const { name, color } = req.body;

  let imageFileName = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imageFileName = `/media/${req.files.image[0].filename}`;
  }

  const fileName = category?.image?.split("/").pop();
  const filePath = path.join(__dirname, "..", "uploads", "media", fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  (subCategory.name = name ? name : subCategory.name),
    (subCategory.color = color ? color : subCategory.color),
    (subCategory.image = imageFileName ? imageFileName : subCategory.image);
  const result = await category.save();
  return sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Updated Successully",
    data: result
  });
});
