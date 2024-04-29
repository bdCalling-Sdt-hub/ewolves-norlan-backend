const express = require("express");
const auth = require("../middlewares/auth");
const { USER_ROLE } = require("../enums/user");
const {
  createCommunity,
  getCommunity,
} = require("../controllers/community.controller");
const router = express.Router();

router.post("/create-community", auth(USER_ROLE.USER), createCommunity);
router.get("/", auth(USER_ROLE.USER, USER_ROLE.ARTIST), getCommunity);

module.exports = router;
