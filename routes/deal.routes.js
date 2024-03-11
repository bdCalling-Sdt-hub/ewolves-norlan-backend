const express = require("express");
const router = express.Router();
const { makeDeal } = require("../controllers/deal.controller");
const fileUpload = require("../middlewares/fileUpload")
router.post("/make-deal/:id", fileUpload(), makeDeal)
module.exports = router;