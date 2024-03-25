const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const { createEvent, getEvent, updateEvent } = require("../controllers/event.controller.js")

router.post("/create-event", configureFileUpload(), createEvent);
router.get("/get-event", getEvent);
router.patch("/update-event/:id", configureFileUpload(), updateEvent)

module.exports = router;