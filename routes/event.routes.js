const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const { createEvent } = require("../controllers/event.controller.js")

router.post("/create-event", configureFileUpload(), createEvent)

module.exports = router;