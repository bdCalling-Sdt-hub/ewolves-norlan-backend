const express = require("express");
const router = express.Router();
const { getChatByUserID, getUserById } = require("../controllers/chat.controller");
const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");

router.get("/get-chat/:senderId/:receiverId", getChatByUserID);
router.get("/get-user-list", auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),  getUserById);

module.exports = router;