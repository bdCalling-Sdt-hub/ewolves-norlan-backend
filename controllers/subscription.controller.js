const SubscriptionModel = require("../models/subscriptionSchema");

// add slider image
exports.addSubscription = async (req, res, next) => {
    try {
        const { package_name, package_duration, package_price, gig_count, package_features } = req.body;
     
      
        const result = await SubscriptionModel.create({ 
            package_name: package_name,
            package_duration: package_duration,
            package_price: parseInt(package_price),
            gig_count: parseInt(gig_count),
            package_features 
        });
        console.log(result)
        return res.status(200).send({ status: 200, message: "Subscription Added Successfully", data: result});

    } catch (error) {
        next(error);
    }
};

// get all slider
exports.getSubscription=async(req, res, next)=>{
    try {
        const subscription = await SubscriptionModel.find({});
        if(!subscription){
            res.status(204).send({ status: 204, messege:"Data not Found"});
        }
        return res.status(200).send({ status: 200, messege:"Slider Added Successfully", data: subscription});
    } catch (error) {
        next(error);
    }
}

// update single slider
exports.updateSubscription=async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await SubscriptionModel.findById(id);
        console.log(result)
        const {package_name, package_duration, package_price, gig_count } = req.body;
        if(!result){
            res.status(204).send({ status: 204, messege:"Data not Found"});
        }

        result.package_name = package_name ? package_name : result.package_name
        result.package_duration = package_duration ? package_duration : result.package_duration
        result.package_price= package_price ? package_price : result.package_price 
        result.gig_count= gig_count ? gig_count : result.gig_count

        await result.save(); 
        return res.status(200).send({ status: 200, messege:"Subscription Updated Successfully", data: result});

    } catch (error) {
        next(error);
    }
}