const SubCategoryModel = require("../models/subCategory.model");
const fs = require("fs");
const path = require("path");
const sendResponse = require("../shared/sendResponse");
const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const catchAsync = require("../shared/CatchAsync");

// create sub category
exports.createSubCategoryToDB = catchAsync(async (req, res, next) => {
    console.log(req.body)
    let imageFileName = "";
    if (req.files && req.files.image && req.files.image[0]) {
        imageFileName = `/media/${req.files.image[0].filename}`;
    }

    const payloadData  = {
        ...req.body,
        image: imageFileName
    }

    const result = await SubCategoryModel.create(payloadData);

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sub Category created Successfully",
        data: result,
    });
});

// fetch  sub category data
exports.getSubCategoriesFromDB = catchAsync(async (req, res, next) => {
    const subCategories = await SubCategoryModel.find();
    
    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sub Category Data Retrieved successfully",
        data: subCategories,
    });
});

// fetch  sub category data
exports.getSubCategoryByCategoryFromDB = catchAsync(async (req, res, next) => {
    const category = req.params.category;
    const subCategories = await SubCategoryModel.find({category: category});
    
    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sub Category Data Retrieved successfully",
        data: subCategories,
    });
});

// delete sub category
exports.deleteSubCategoryToDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const isExistSubCategory = await SubCategoryModel.findOneAndDelete({ _id: id });
    if (!isExistSubCategory) {
        throw new ApiError(404, "No Sub Category Found");
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sub Category Delete Successfully",
    });
});

// update category
exports.updateSubCategoryToDB = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const category = await SubCategoryModel.findOne({ _id: id });
    if (!category) {
        throw new ApiError(404, "No Sub Category Found");
    }

    let imageFileName;
    if (req.files && req.files.image && req.files.image[0]) {
        imageFileName = `/media/${req.files.image[0].filename}`;
    }

    if (imageFileName) {
        const fileName = category?.image?.split("/").pop();
        const filePath = path.join(__dirname, "..", "uploads", "media", fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    const updatedData ={
        ...req.body,
        image: imageFileName
    }
    
    // Update sub category and return result
    const result = await SubCategoryModel.findByIdAndUpdate(
        { _id: id },
        updatedData,
        { new: true }
    );

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sub Category Updated Successfully",
        data: result,
    });
});