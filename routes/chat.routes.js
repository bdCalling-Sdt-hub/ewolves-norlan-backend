const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");
const fileUpload = require('../middlewares/fileUpload.js');
const { createConversation, getConversations, getSingleConversation } = require('../controllers/conversation.controller.js');
const { createMessageToDB, getMessageFromDB } = require('../controllers/message.controller.js');

router.post("/create-conversation", fileUpload(), createConversation);
router.get("/get-conversations/:userId", getConversations);
router.get("/get-conversation/:firstUserId/:secondUserId", getSingleConversation);
router.post("/create-message", fileUpload(), createMessageToDB);
router.get("/get-message/:conversationId",  getMessageFromDB);


module.exports = router;