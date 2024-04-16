const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const { createEvent, getEvent, updateEvent } = require("../controllers/event.controller.js")
const { checkAdmin } = require("../middlewares/checkAdmin");
const { checkUser } = require("../middlewares/checkUser");

router.post("/create-event", checkAdmin, configureFileUpload(), createEvent);
router.get("/get-event", checkUser, getEvent);
router.patch("/update-event/:id", configureFileUpload(), updateEvent)

module.exports = router;