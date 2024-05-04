const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");
const fileUpload = require('../middlewares/fileUpload.js');
const { createConversationToDB, getConversationsFromDB, getSingleConversationFromDB } = require('../controllers/conversation.controller.js');
const { createMessageToDB, getMessageFromDB } = require('../controllers/message.controller.js');

// conversation api
router.post("/create-conversation", auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER), fileUpload(), createConversationToDB);
router.get("/get-conversations", auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER), getConversationsFromDB);
router.get("/get-conversation/:firstUserId/:secondUserId", getSingleConversationFromDB);

// message api
router.post("/create-message", fileUpload(), createMessageToDB);
router.get("/get-message/:conversationId",  getMessageFromDB);


module.exports = router;