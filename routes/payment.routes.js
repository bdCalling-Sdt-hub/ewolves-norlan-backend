const express = require("express");
const { USER_ROLE } = require("../enums/user");
const auth = require("../middlewares/auth");
const { createPaymentIntent } = require("../controllers/payment.controller");
const router = express.Router();

router.post(
  "/create-payment-intent",
  // auth(USER_ROLE.USER),
  createPaymentIntent
);

module.exports = router;
