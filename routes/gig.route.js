const express = require("express");
const {
  createGigToDB,
  getAllGigFromDB,
  findGigByArtistId,
} = require("../controllers/gig.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const router = express.Router();

router.post("/create-gig", configureFileUpload(), createGigToDB);
router.get("/artist/:id", findGigByArtistId);
router.get("/", getAllGigFromDB);

module.exports = router;
