const express = require("express");
const {
  createGigToDB,
  getAllGigFromDB,
  updateGigToDB,
  findGigByArtistId,
  addRating
} = require("../controllers/gig.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const router = express.Router();

router.post("/create-gig", configureFileUpload(), createGigToDB);
router.get("/artist/:id", findGigByArtistId);
router.get("/", getAllGigFromDB);
router.patch("/update-gig/:id", configureFileUpload(), updateGigToDB);
router.post("/add-rating/:id", configureFileUpload(), addRating)

module.exports = router;
