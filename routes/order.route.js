const express = require("express");
const auth = require("../middlewares/auth");
const { USER_ROLE } = require("../enums/user");
const { makeOrder } = require("../controllers/order.controller");
const router = express.Router();

router.post("/", auth(USER_ROLE.USER), makeOrder);

const OrderRoutes = router;
module.exports = OrderRoutes;
