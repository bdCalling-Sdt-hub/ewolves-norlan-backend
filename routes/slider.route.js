const express = require("express");
const router = express.Router();
const slidercontroller = require("../controllers/slider.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");

router.post("/slider", configureFileUpload(), slidercontroller.addSlider);
router.get("/slider", slidercontroller.getSlider);
router.patch(
  "/slider/:id",
  configureFileUpload(),
  slidercontroller.updateSlider
);
router.delete("/delete-slider/:id", slidercontroller.deleteSlider);

module.exports = router;
