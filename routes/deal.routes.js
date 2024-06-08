const express = require("express");
const router = express.Router();
const {
  makeDeal,
  getDealByUserId,
  changeDealStatusToDB,
  getUserDeal,
} = require("../controllers/deal.controller");
const fileUpload = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");
const { USER_ROLE } = require("../enums/user");

// router.post(
//   "/make-deal/:id",
//   auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
//   fileUpload(),
//   makeDeal
// );

router.get("/get-deal", auth(USER_ROLE.ARTIST, USER_ROLE.USER), getUserDeal);

// router.patch(
//   "/change-deal-status/:id",
//   auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
//   changeDealStatusToDB
// );

module.exports = router;
