const SliderModel = require("../models/sliderSchema"); // Corrected import statement
const fs = require('fs');
const path =require("path");

// add slider image
exports.addSlider = async (req, res, next) => {
    try {
        let imageFileName = "";
        if (req.files && req.files.image && req.files.image[0]) {
            imageFileName = `/uploads/image/${req.files.image[0].filename}`;
        }

        const result = await SliderModel.create({ slider: imageFileName });
        return res.status(200).send({ status: 200, message: "Slider Added Successfully", data: result});

    } catch (error) {
        next(error);
    }
};

// get all slider
exports.getSlider=async(req, res, next)=>{
    try {
        const slider = await SliderModel.find({});
        if(!slider){
            res.status(204).send({ status: 204, messege:"Data not Found"});
        }
        return res.status(200).send({ status: 200, messege:"Slider Added Successfully", data: slider});
    } catch (error) {
        next(error);
    }
}

// update single slider
exports.updateSlider=async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await SliderModel.findOne({_id: id});
        if(!result){
            res.status(204).send({ status: 204, messege:"Data not Found"});
        }

        const fileName = result?.slider?.split("/").pop();
        const filePath = path.join(__dirname, '..', 'uploads', 'image', fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        let imageFileName = "";
        if (req.files && req.files.image && req.files.image[0]) {
            imageFileName = `/uploads/image/${req.files.image[0].filename}`;
        }
        
        result.slider= imageFileName;
        await result.save(); 
        return res.status(200).send({ status: 200, messege:"Slider Updated Successfully"});

    } catch (error) {
        next(error);
    }
}

// delete a single slider
exports.deleteSlider=async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await SliderModel.findOne({_id: id});
        if(!result){
            res.status(200).send({ status: 200, messege:"No Data Found"});
        }

        
        const fileName = result?.slider?.split("/").pop();
        const filePath = path.join(__dirname, '..', 'uploads', 'image', fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            await SliderModel.findByIdAndDelete({_id : id});
            return res.status(200).send({ status: 200, messege:"Slider Delete Successfully"});
        }
        
    } catch (error) {
        next(error); 
    }
}