const PrivacyModel = require("../models/privacy.model");

exports.addPrivacy = async(req, res, next)=>{
    try {
        const {name, description} = req.body;

        let result;
        if(name && description){
            result = await PrivacyModel.create({
                name: name,
                description: description
            })
        }

        return res.status(200).send({
            status: 200,
            message: "Privacy And Policy Added Successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}