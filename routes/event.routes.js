const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const { createEvent, getEvent } = require("../controllers/event.controller.js")

router.post("/create-event", configureFileUpload(), createEvent);
router.get("/get-event", getEvent)

module.exports = router;