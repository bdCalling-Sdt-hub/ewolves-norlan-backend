const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/about.controller");
const configureFileUpload = require("../middlewares/fileUpload.middleware")

router.post("/create-about", configureFileUpload(), aboutController.addAboutUs);
router.get('/get-about', aboutController.getAboutUs);
router.patch("/update-about/:id", configureFileUpload(), aboutController.updateAboutUs);
module.exports = router;