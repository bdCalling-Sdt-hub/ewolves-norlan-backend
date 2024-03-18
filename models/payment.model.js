const { Schema, Model } = require("mongoose");
const paymentSchema = new Schema({
    transactionId: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    package : {
        type: Schema.Types.ObjectId,
        ref:"Subscription",
        required: true
    }
})

const Payment = Model("payment", paymentSchema);
module.exports = Payment;