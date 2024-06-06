const { Schema, model } = require("mongoose");

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order ID is required"],
    },
  },
  { timestamps: true }
);

const Token = model("Token", tokenSchema);

module.exports = Token;
