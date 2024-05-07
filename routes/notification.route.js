const express = require("express");
const router = express.Router();
const { USER_ROLE } = require("../enums/user");
const auth = require("../middlewares/auth");
const {
  addNotification,
  getNotification,
  readNotifications,
} = require("../controllers/notification.controller");

router.patch(
  "/read",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  readNotifications
);

router
  .route("/")
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER), getNotification)
  .post(
    auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
    addNotification
  );

module.exports = router;
