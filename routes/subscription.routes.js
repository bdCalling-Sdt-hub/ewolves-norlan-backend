const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription.controller.js")
const configureFileUpload=require("../middlewares/fileUpload.middleware.js");

// category
router.post("/add-subscription", configureFileUpload(), subscriptionController.addSubscription);
router.get("/subscription", subscriptionController.getSubscription);
router.patch("/update-subscription/:id", configureFileUpload(), subscriptionController.updateSubscription);

module.exports = router;