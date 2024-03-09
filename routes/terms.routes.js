const express = require("express");
const router = express.Router();
const termsController = require("../controllers/terms.controller");
const configureFileUpload = require("../middlewares/fileUpload.middleware");
router.post("/create-terms-and-condition", configureFileUpload(), termsController.addTerms);
router.get("/get-terms-and-condition", termsController.getTerms);
router.patch("/update-terms-and-condition/:id", configureFileUpload(), termsController.updateTerms);
module.exports = router