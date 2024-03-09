const express = require("express");
const { createGigToDB } = require("../controllers/gig.controller");
const configureFileUpload = require("../middlewares/fileUpload.middleware");
const router = express.Router();

router.post("/create-gig", configureFileUpload(), createGigToDB);

module.exports = router;
