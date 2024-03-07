const express = require("express");
const router = express.Router();
const slidercontroller = require("../controllers/slider.controller.js")
const configureFileUpload=require("../middlewares/fileUpload.middleware.js");

router.post("/slider", configureFileUpload(), slidercontroller.addSlider);
router.get("/slider", slidercontroller.getSlider);
router.delete("/delete-slider:id", slidercontroller.deleteSlider);

module.exports = router;