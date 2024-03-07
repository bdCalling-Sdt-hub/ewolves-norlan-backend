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