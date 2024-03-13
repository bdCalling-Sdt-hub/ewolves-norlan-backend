const express = require("express");
const router = express.Router();
const { getChatByUserID } = require("../controllers/chat.controller");

router.get("/get-chat/:senderId/:receiverId", getChatByUserID);

module.exports = router;