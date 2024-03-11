const express = require("express");
const router = express.Router();
const { makeDeal, getDealByUserId, changeDealStatusToDB } = require("../controllers/deal.controller");
const fileUpload = require("../middlewares/fileUpload")
router.post("/make-deal/:id", fileUpload(), makeDeal);
router.get("/get-deal/:id", getDealByUserId);
router.patch("/change-deal-status/:id", changeDealStatusToDB)
module.exports = router;