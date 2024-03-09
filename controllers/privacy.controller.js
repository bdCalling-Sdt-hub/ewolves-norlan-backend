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

exports.getPrivacy = async(req, res, next)=>{
    try {
        const privacy = await PrivacyModel.find({});
        if(!privacy){
            return res.status(204).send({
                status: 204,
                message: "No Data Found",
                data: privacy
            });
        }

        return res.status(200).send({
            status: 200,
            message: "Privacy Policy Date Fetched",
            data: privacy
        })
    } catch (error) {
        next(error)
    }
}