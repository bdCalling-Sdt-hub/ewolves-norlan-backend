const express = require("express");
const { model } = require("mongoose");
const privacyController = require("../controllers/privacy.controller");
const configureFileUpload = require("../middlewares/fileUpload.middleware");
const router = express.Router();
router.post("/create-privacy", configureFileUpload(), privacyController.addPrivacy);
router.get("/get-privacy", privacyController.getPrivacy)
module.exports = router;