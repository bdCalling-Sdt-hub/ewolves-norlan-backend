const express = require("express");
const {
  createGigToDB,
  getAllGigFromDB,
} = require("../controllers/gig.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const router = express.Router();

router.post("/create-gig", configureFileUpload(), createGigToDB);
router.get("/", getAllGigFromDB);

module.exports = router;
