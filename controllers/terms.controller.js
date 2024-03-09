const TermsModel = require("../models/terms.model");
const catchAsync = require("../shared/CatchAsync");
const sendResponse = require("../shared/sendResponse");

exports.addTerms= catchAsync(async(req, res, next)=>{
    const { name, description } = req.body;
    let result;
    if(name && description){
        result = await TermsModel.create({
            name: name,
            description: description
        });
    }
    return sendResponse(res, 200, "Terms And condition Added Successfully", result);
});

exports.getTerms = catchAsync(async(req, res, next)=>{
    try {
        const terms = await TermsModel.find({});
        if(!terms){
            return sendResponse(res, 204, "No Data Found", terms);
        }

        return sendResponse(res, 200, "Terms And Condition Fetch Data Successfully", terms);
    } catch (error) {
        next(error)
    }
});

exports.updateTerms = catchAsync(async(req, res, next)=>{

    const {id} = req.params;
    const {name, description} = req.body;
    const terms = await TermsModel.findById(id);
    if(!terms){
        return sendResponse(res, 204, "No Data Found", terms);
    }

    terms.name = name ? name : terms.name;
    terms.description=  description ? description : terms.description;
    const result = await terms.save();
    return sendResponse(res, 200, "Terms and Condition Updated Successfully", result);
});