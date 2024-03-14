const express = require("express");
const router = express.Router();
const { getChatByUserID, getChatUserById } = require("../controllers/chat.controller");

router.get("/get-chat/:senderId/:receiverId", getChatByUserID);
router.get("/get-user-list/:id", getChatUserById);

module.exports = router;