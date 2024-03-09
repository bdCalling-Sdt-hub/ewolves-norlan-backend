const express = require("express");
const router = express.Router();
const termsController = require("../controllers/terms.controller");
const configureFileUpload = require("../middlewares/fileUpload.middleware");
router.post("/create-terms-and-condition", configureFileUpload(), termsController.addTerms);
module.exports = router