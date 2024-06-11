const express = require("express");
const auth = require("../middlewares/auth");
const { USER_ROLE } = require("../enums/user");
const {
  makeOrder,
  getArchiveList,
  getDealList,
  getSingleDeal,
} = require("../controllers/order.controller");
const router = express.Router();

router.get("/get-deal", auth(USER_ROLE.USER, USER_ROLE.ARTIST), getDealList);

router.get(
  "/archive-list",
  auth(USER_ROLE.USER, USER_ROLE.ARTIST),
  getArchiveList
);

router.get(
  "/get-deal/:id",
  auth(USER_ROLE.USER, USER_ROLE.ARTIST),
  getSingleDeal
);

router.post("/", auth(USER_ROLE.USER), makeOrder);

const OrderRoutes = router;
module.exports = OrderRoutes;
