const express = require("express");
const router = express.Router();
const { makeDeal, getDealByUserId, changeDealStatusToDB } = require("../controllers/deal.controller");
const fileUpload = require("../middlewares/fileUpload");
const { checkUser } = require("../middlewares/checkUser");
router.post("/make-deal/:id", checkUser, fileUpload(), makeDeal);
router.get("/get-deal/:id", checkUser, getDealByUserId);
router.patch("/change-deal-status/:id", checkUser, changeDealStatusToDB)
module.exports = router;