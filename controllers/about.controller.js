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