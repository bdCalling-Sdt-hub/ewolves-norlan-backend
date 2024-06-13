const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const {
  createEvent,
  getEvent,
  updateEvent,
} = require("../controllers/event.controller.js");

const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");

router.post(
  "/create-event",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  createEvent
);
router.get(
  "/get-event",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getEvent
);
router.patch(
  "/update-event/:id",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  updateEvent
);

exports.EventRoutes = router;
