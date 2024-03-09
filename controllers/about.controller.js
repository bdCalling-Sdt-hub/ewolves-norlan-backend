const AboutModel = require("../models/about.model");

exports.addAboutUs= async(req, res, next)=>{
    try {
        const { name, description } = req.body;
        let result;
        if(name && description){
            result = await AboutModel.create({
                name: name,
                description: description
            });
        }
        return res.status(200).send({status:200, message: "About Us Added Successfully", data: result});
    } catch (error) {
        next(error)
    }
}


exports.getAboutUs= async(req, res, next)=>{
    try {
        const about = await AboutModel.find();
        if(!about){
            return res.status(204).send({status:204, message: "No Data Found", data: about})
        }
        return res.status(200).send({status:200, message: "About Us fetch Successfully", data: about})
    } catch (error) {
        next(error)
    }
}