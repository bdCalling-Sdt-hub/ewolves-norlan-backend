const express = require("express");
const {
  createGigToDB,
  getAllGigFromDB,
  updateGigToDB,
  findGigByArtistId,
  addRating
} = require("../controllers/gig.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const { checkUser } = require("../middlewares/checkUser");
const router = express.Router();

router.post("/create-gig", checkUser, configureFileUpload(), createGigToDB);
router.get("/artist/:id", checkUser, findGigByArtistId);
router.get("/", checkUser, getAllGigFromDB);
router.patch("/update-gig/:id", checkUser, configureFileUpload(), updateGigToDB);
router.post("/add-rating/:id", checkUser, addRating)

module.exports = router;
