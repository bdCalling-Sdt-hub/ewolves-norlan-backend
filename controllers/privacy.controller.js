const PrivacyModel = require("../models/privacy.model");
const sendResponse = require("../shared/sendResponse");

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
            return sendResponse(res, 204, "No Data Found", privacy);
        }

        return sendResponse(res, 200, "Privacy Policy Date Fetched", privacy);
    } catch (error) {
        next(error)
    }
}

exports.updatePrivacy = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const {name, description} = req.body;
        const privacy = await PrivacyModel.findById(id);
        if(!privacy){
            return sendResponse(res, 204, "No Data Found", privacy); 
        }
        
        privacy.name= name ? name : privacy.name;
        privacy.description = description ? description : privacy.description;
        const result = await privacy.save();
        return sendResponse(res, 200, "Privacy Updated Successfully", result); 
    } catch (error) {
        next(error)
    }
}