const CategoryModel = require("../models/categorySchema");
const fs = require('fs');
const path =require("path");

// add category 
exports.addCategory = async (req, res, next) => {
    try {
        const { name, primary_color, secondary_color } = req.body;
        let imageFileName = "";
        if (req.files && req.files.image && req.files.image[0]) {
            imageFileName = `/upload/image/${req.files.image[0].filename}`;
        }

        const result = await CategoryModel.create({ 
            name: name,
            primary_color: primary_color,
            secondary_color: secondary_color,
            image: imageFileName
        });
        return res.status(200).send({ status: 200, message: "Category Added Successfully", data: result});

    } catch (error) {
        next(error);
    }
};

// fetch category
exports.getCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.find({});
        if(!category){
            return res.status(204).send({ status: 204, message: "No Data Found"});
        }
        return res.status(200).send({ status: 200, message: "Category fetch Successfully", data: category});

    } catch (error) {
        next(error);
    }
};

// get single category
exports.getSingleCategory = async (req, res, next) => {
    try {
        const {id} = req.params;
        const category = await CategoryModel.findOne({_id: id});
        if(!category){
            return res.status(204).send({ status: 204, message: "No Data Found"});
        }
        return res.status(200).send({ status: 200, message: "Category fetch Successfully", data: category});

    } catch (error) {
        next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const {id} = req.params;
        const category = await CategoryModel.findOne({_id: id});
        if(!category){
            return res.status(204).send({ status: 204, message: "No Data Found"});
        }
        return res.status(200).send({ status: 200, message: "Category fetch Successfully", data: category});

    } catch (error) {
        next(error);
    }
};


// update category 
exports.updateCategory = async (req, res, next) => {
    try {
        
        const {id } = req.params;
        const category= await CategoryModel.findOne({_id: id});
        if(!category){
            return res.status(204).send({ status: 204, message: "No Data Found"});
        }

        const { name, primary_color, secondary_color } = req.body;
        let imageFileName = "";
        if (req.files && req.files.image && req.files.image[0]) {
            imageFileName = `/upload/image/${req.files.image[0].filename}`;
        }

        const fileName = category?.image?.split("/").pop();
        const filePath = path.join(__dirname, '..', 'upload', 'image', fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        category.name= name ? name : category.name,
        category.primary_color= primary_color ? primary_color : category.primary_color,
        category.secondary_color= secondary_color ? secondary_color : category.secondary_color,
        category.image= imageFileName ? imageFileName : category.image
        const result = await category.save();
        
        return res.status(200).send({ status: 200, message: "Category Updated Successfully", data: result});

    } catch (error) {
        next(error);
    }
};

exports.addSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);
        if(!category){
            return res.status(204).send({ status: 204, message: "No Data Found"});
        }

        const { name, color } = req.body;

        let imageFileName = "";
        if (req.files && req.files.image && req.files.image[0]) {
            imageFileName = `/upload/image/${req.files.image[0].filename}`;
        }

        const value = { 
            name: name,
            color: color,
            image: imageFileName
        };

        category.sub_category.push(value);
        const newCategory = await category.save();

        return res.status(200).send({ status: 200, message: "Sub Category Added Successfully", data: newCategory});

    } catch (error) {
        next(error);
    }
};


exports.getSubCategory = async (req, res, next) => {
    try {
        const { catId, subId } = req.params;
        const category = await CategoryModel.findById(catId);
        const subCategory = category.sub_category.id(subId);
        if(!subCategory){
            return res.status(204).send({ status: 204, message: "No Data Found"});
        }
        return res.status(200).send({ status: 200, message: "Sub Category Details Fetch Successfully"});

    } catch (error) {
        next(error);
    }
};

exports.deleteSubCategory = async (req, res, next) => {
    try {
        const { catId, subId } = req.params;
        const category = await CategoryModel.findById(catId);
        const subCategory = category.sub_category.id(subId);
        if(!subCategory){
            return res.status(204).send({ status: 204, message: "No Data Found"});
        }

        const fileName = subCategory?.image?.split("/").pop();
        const filePath = path.join(__dirname, '..', 'upload', 'image', fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        subCategory.deleteOne();
        const data =  await category.save();

        return res.status(200).send({ status: 200, message: "Remove Sub Category Item Successfully", data: data});

    } catch (error) {
        next(error);
    }
};


exports.updateSubCategory = async (req, res, next) => {
    try {
        const { catId, subId } = req.params;
        const category = await CategoryModel.findById(catId);
        const subCategory = category.sub_category.id(subId);
        if(!subCategory){
            return res.status(204).send({ status: 204, message: "No Data Found"});
        }

        const { name, color } = req.body;

        let imageFileName = "";
        if (req.files && req.files.image && req.files.image[0]) {
            imageFileName = `/upload/image/${req.files.image[0].filename}`;
        }

        const fileName = category?.image?.split("/").pop();
        const filePath = path.join(__dirname, '..', 'upload', 'image', fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        subCategory.name= name ? name : subCategory.name,
        subCategory.color= color ? color : subCategory.color,
        subCategory.image= imageFileName ? imageFileName : subCategory.image
        const result = await category.save();
        
        return res.status(200).send({ status: 200, message: "Category Updated Successfully", data: result});

    } catch (error) {
        next(error);
    }
};