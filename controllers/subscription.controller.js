const SubscriptionModel = require("../models/subscriptionSchema");
const CatchAsync = require("../shared/CatchAsync");
const sendResponse = require("../shared/sendResponse");

// add slider image
exports.addSubscription = CatchAsync(async (req, res, next) => {
    const { package_name, package_duration, package_price, gig_count, package_features } = req.body;
     
    const result = await SubscriptionModel.create({ 
        package_name: package_name,
        package_duration: package_duration,
        package_price: parseInt(package_price),
        gig_count: parseInt(gig_count),
        package_features 
    });
    return sendResponse(res, 200, "Subscription Added Successfully", result);
});

// get all slider
exports.getSubscription= CatchAsync(async(req, res, next)=>{
    
    const subscription = await SubscriptionModel.find({});
    if(!subscription){
        return sendResponse(res, 204, "No Data Found", subscription);
    }
    return sendResponse(res, 200, "Slider Added Successfully", subscription);
    
});

// update single slider
exports.updateSubscription= CatchAsync(async(req, res, next)=>{

    const {id} = req.params;
    const {package_name, package_duration, package_price, gig_count } = req.body;
    const result = await SubscriptionModel.findById(id);
    if(!result){
        return sendResponse(res, 204, "No Data Found", result);
    }

    result.package_name = package_name ? package_name : result.package_name
    result.package_duration = package_duration ? package_duration : result.package_duration
    result.package_price= package_price ? package_price : result.package_price 
    result.gig_count= gig_count ? gig_count : result.gig_count

    await result.save();
    return sendResponse(res, 200, "Subscription Updated Successfully", result);
})