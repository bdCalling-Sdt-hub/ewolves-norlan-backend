const mongoose = require("mongoose")
const sliderSchema = new mongoose.Schema({
    slider:{
        type: String,
        required: true
    }
},{ timestamps: true });

const SliderSchema = mongoose.model("slider", sliderSchema);
module.exports = SliderSchema;
