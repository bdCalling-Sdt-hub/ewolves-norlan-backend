const express = require("express");
const router = express.Router();
const {
  addSubscription,
  getSubscription,
  updateSubscription,
  getSingleSubscription,
} = require("../controllers/subscription.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");

// category
router.post(
  "/create-subscription",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  addSubscription
);
router.get(
  "/subscription",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getSubscription
);
router.get(
  "/subscription-details/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getSingleSubscription
);
router.patch(
  "/update-subscription/:id",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  updateSubscription
);

exports.SubscriptionRoutes = router;
