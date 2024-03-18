const express = require("express");
const router = express.Router();
const { addSubscription, getSubscription, updateSubscription } = require("../controllers/subscription.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkAdmin } = require("../middlewares/checkAdmin.js");
const { checkUser } = require("../middlewares/checkUser.js");

// category
router.post( "/create-subscription", checkAdmin, configureFileUpload(), addSubscription );
router.get("/subscription", checkUser, getSubscription);
router.patch( "/update-subscription/:id", checkAdmin, configureFileUpload(), updateSubscription);

module.exports = router;
