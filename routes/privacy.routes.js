const express = require("express");
const router = express.Router();
const privacyController = require("../controllers/privacy.controller");
const configureFileUpload = require("../middlewares/fileUpload.middleware");

router.post("/create-privacy", configureFileUpload(), privacyController.addPrivacy);
router.get("/get-privacy", privacyController.getPrivacy);
router.patch("/update-privacy/:id", configureFileUpload(), privacyController.updatePrivacy);

module.exports = router;