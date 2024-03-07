const SliderModel = require("../models/sliderSchema"); // Corrected import statement

exports.addSlider = async (req, res, next) => {
    try {
        let imageFileName = "";
        if (req.files && req.files.image && req.files.image[0]) {
            imageFileName = `/upload/image/${req.files.image[0].filename}`;
        }
        console.log(imageFileName);
        if (!imageFileName) {
            res.status(204).send({ status: 204, message: "Data not Found" }); // Changed 'messege' to 'message'
        }
        const result = await SliderModel.create({ image: imageFileName }); // Corrected usage of SliderModel.create()
        console.log(result);
        return res.status(200).send({ status: 200, message: "Slider Added Successfully", data: result }); // Changed 'messege' to 'message'
    } catch (error) {
        next(error);
    }
};


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



exports.updateSlider=async(req, res, next)=>{
    try {
        const { slider } = req.body;
        if(slider){
            res.status(204).send({ status: 204, messege:"Data not Found"});
        }
        const result = await SliderModel.create(slider);
        return res.status(200).send({ status: 200, messege:"Slider Added Successfully"});
    } catch (error) {
        next(error);
    }
}

exports.deleteSlider=async(req, res, next)=>{
    try {
        const id = req.params.id;
        console.log(id);
        /* const slider = await UserModel.findById({_id: id});
        if(!slider){
            res.status(204).send({ status: 204, messege:"Data not Found"});
        }

        console.log(SliderSchema)
        const result = await SliderSchema.create(slider);
        return res.status(200).send({ status: 200, messege:"Slider Added Successfully"}); */
    } catch (error) {
        next(error);
    }
}