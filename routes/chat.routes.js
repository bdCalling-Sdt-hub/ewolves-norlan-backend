const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");
const fileUpload = require("../middlewares/fileUpload.js");
const {
  createConversationToDB,
  getConversationsFromDB,
  getSingleConversationFromDB,
} = require("../controllers/conversation.controller.js");
const {
  createMessageToDB,
  getMessageFromDB,
  deleteMessage,
} = require("../controllers/message.controller.js");

// conversation controller
router.post(
  "/create-conversation",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  fileUpload(),
  createConversationToDB
);
router.get(
  "/get-conversations",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getConversationsFromDB
);
router.get(
  "/get-conversation/:firstUserId/:secondUserId",
  getSingleConversationFromDB
);

// message controller
router.post(
  "/create-message",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  fileUpload(),
  createMessageToDB
);
router.get(
  "/get-message/:conversationId",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getMessageFromDB
);
router.delete(
  "/delete-message/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  deleteMessage
);

exports.ChatRoutes = router;
