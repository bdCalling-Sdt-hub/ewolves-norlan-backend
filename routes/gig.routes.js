const express = require("express");
const {
  createGigToDB,
  getAllGigFromDB,
  updateGigToDB,
  findGigByArtistId,
  addRating,
} = require("../controllers/gig.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");
const { USER_ROLE } = require("../enums/user");
const router = express.Router();

router.post(
  "/create-gig",
  auth(USER_ROLE.ARTIST),
  configureFileUpload(),
  createGigToDB
);
router.get(
  "/artist/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  findGigByArtistId
);
router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getAllGigFromDB
);
router.patch(
  "/update-gig/:id",
  auth(USER_ROLE.ARTIST),
  configureFileUpload(),
  updateGigToDB
);
router.post(
  "/add-rating/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  addRating
);

module.exports = router;
