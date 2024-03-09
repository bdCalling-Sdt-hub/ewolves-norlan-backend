const CategoryModel = require("../models/categorySchema");
const fs = require('fs');
const path =require("path");
const sendResponse = require("../shared/sendResponse");
const CatchAsync = require("../shared/CatchAsync");

// add category 
exports.addCategory = CatchAsync(async (req, res, next) => {
    const { name, primary_color, secondary_color } = req.body;
    let imageFileName = "";
    if (req.files && req.files.image && req.files.image[0]) {
        imageFileName = `/media/${req.files.image[0].filename}`;
    }
    const result = await CategoryModel.create({ 
        name: name,
        primary_color: primary_color,
        secondary_color: secondary_color,
        image: imageFileName
    });
    return sendResponse(res, 200, "Category Added Successfully", result)
});

// fetch category
exports.getCategory = CatchAsync(async (req, res, next) => {
    const category = await CategoryModel.find({});
    if(!category){
        return sendResponse(res, 204, "No Data Found", category);
    }
    return sendResponse(res, 200, "Category fetch Successfully", category)
});

// get single category
exports.getSingleCategory = CatchAsync(async (req, res, next) => {
    const {id} = req.params;
    const category = await CategoryModel.findOne({_id: id});
    if(!category){
        return sendResponse(res, 204, "No Data Found", category)
    }
    return sendResponse(res, 200, "Category Fetch Successfully", category)
});

exports.deleteCategory = CatchAsync(async (req, res, next) => {
    const {id} = req.params;
    const category = await CategoryModel.findOne({_id: id});
    if(!category){
        return sendResponse(res, 204, "No Data Found", category)
    }
    return sendResponse(res, 200, "Category Fetch Successfully", category)
});


// update category 
exports.updateCategory = CatchAsync(async (req, res, next) => {
    
    const {id } = req.params;
    const category= await CategoryModel.findOne({_id: id});
    if(!category){
        return sendResponse(res, 204, "No Data Fouund", category)
    }

    const { name, primary_color, secondary_color } = req.body;
    let imageFileName = "";
    if (req.files && req.files.image && req.files.image[0]) {
        imageFileName = `/media/${req.files.image[0].filename}`;
    }

    const fileName = category?.image?.split("/").pop();
    const filePath = path.join(__dirname, '..', 'uploads', 'media', fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    category.name= name ? name : category.name,
    category.primary_color= primary_color ? primary_color : category.primary_color,
    category.secondary_color= secondary_color ? secondary_color : category.secondary_color,
    category.image= imageFileName ? imageFileName : category.image
    const result = await category.save();
        
    return res.status(200).send({ status: 200, message: "Category Updated Successfully", data: result});
});

exports.addSubCategory = CatchAsync(async (req, res, next) => {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);
        if(!category){
            return sendResponse(res, 204, "No Data Found", category);
        }

        const { name, color } = req.body;

        let imageFileName = "";
        if (req.files && req.files.image && req.files.image[0]) {
            imageFileName = `/media/${req.files.image[0].filename}`;
        }

    const value = { 
        name: name,
        color: color,
        image: imageFileName
    };

    category.sub_category.push(value);
    const newCategory = await category.save();
    return sendResponse(res, 200, "Sub Category Added Successfully", newCategory)
});


exports.getSubCategory = CatchAsync(async (req, res, next) => {
    const { catId, subId } = req.params;
    const category = await CategoryModel.findById(catId);
    const subCategory = category.sub_category.id(subId);
    if(!subCategory){
        return sendResponse(res, 204, "No Data Found", subCategory)
    }
    return sendResponse(res, 200, "Sub Category details Fetch Successfully", result)
});

exports.deleteSubCategory = CatchAsync(async (req, res, next) => {
    const { catId, subId } = req.params;
    const category = await CategoryModel.findById(catId);
    const subCategory = category.sub_category.id(subId);
    if(!subCategory){
        return sendResponse(res, 200, "No Data Found", subCategory)
    }

    const fileName = subCategory?.image?.split("/").pop();
    const filePath = path.join(__dirname, '..', 'uploads', 'media', fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    subCategory.deleteOne();
    const data =  await category.save();
    return sendResponse(res, 200, "Delete Sub Category Item Successfully", data)
});


exports.updateSubCategory = CatchAsync(async (req, res, next) => {

    const { catId, subId } = req.params;
    const category = await CategoryModel.findById(catId);
    const subCategory = category.sub_category.id(subId);
    if(!subCategory){
        return res.status(204).send({ status: 204, message: "No Data Found"});
    }

    const { name, color } = req.body;

    let imageFileName = "";
    if (req.files && req.files.image && req.files.image[0]) {
        imageFileName = `/media/${req.files.image[0].filename}`;
    }

    const fileName = category?.image?.split("/").pop();
    const filePath = path.join(__dirname, '..', 'uploads', 'media', fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    subCategory.name= name ? name : subCategory.name,
    subCategory.color= color ? color : subCategory.color,
    subCategory.image= imageFileName ? imageFileName : subCategory.image
    const result = await category.save();
    return sendResponse(res, 200, "Category Updated Successfully", result)
});