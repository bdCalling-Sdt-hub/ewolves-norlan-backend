const express = require("express");
const router = express.Router();
const { getChatByUserID, getUserById } = require("../controllers/chat.controller");

router.get("/get-chat/:senderId/:receiverId", getChatByUserID);
router.get("/get-user-list/:id", getUserById);

module.exports = router;