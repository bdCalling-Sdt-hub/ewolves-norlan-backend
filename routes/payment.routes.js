const express = require("express");
const { USER_ROLE } = require("../enums/user");
const auth = require("../middlewares/auth");
const {
  createPaymentIntent,
  createConnectedAccount,
  transferAndPayouts,
  getAllTransactionsHistory,
} = require("../controllers/payment.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const router = express.Router();

router.post(
  "/create-payment-intent",
  auth(USER_ROLE.USER),
  createPaymentIntent
);

router.post(
  "/create-account",
  auth(USER_ROLE.ARTIST),
  configureFileUpload(),
  createConnectedAccount
);

router.post("/transfer-payouts", auth(USER_ROLE.ARTIST), transferAndPayouts);

exports.PaymentRoutes = router;
