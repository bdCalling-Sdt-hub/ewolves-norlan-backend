const TermsModel = require("../models/terms.model");
const sendResponse = require("../shared/sendResponse");

exports.addTerms= async(req, res, next)=>{
    try { 
        const { name, description } = req.body;
        let result;
        if(name && description){
            result = await TermsModel.create({
                name: name,
                description: description
            });
        }
        return sendResponse(res, 200, "Terms And condition Added Successfully", result);
    } catch (error) {
        next(error)
    }
}