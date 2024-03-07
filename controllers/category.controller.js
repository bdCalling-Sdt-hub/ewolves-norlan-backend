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