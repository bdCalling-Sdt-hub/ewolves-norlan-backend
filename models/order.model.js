const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    transactionId: {
      type: String,
      require: [true, "TransactionId is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Artist is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    orderStatus: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["paid_to_admin", "transferred_to_artist"],
      required: [true, "Payment status is required"],
    },
  },
  { timestamps: true }
);

orderSchema.statics.isOrderExist = async (id) => {
 return await Order.findById(id)
}

const Order = model("Order", orderSchema);
module.exports = Order;
