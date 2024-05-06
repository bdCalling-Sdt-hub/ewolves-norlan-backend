const { Schema, Model, model } = require("mongoose");
const paymentSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  package: {
    type: Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
});

const Payment = model("Payment", paymentSchema);
module.exports = Payment;
