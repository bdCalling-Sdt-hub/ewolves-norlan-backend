const express = require("express");
const {
  createHighlightToDB,
  getHighlightFromDB,
  deleteHighlightFromDB,
  updateHighlightToDB,
} = require("../controllers/highlight.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const router = express.Router();

router.post("/create-highlight", configureFileUpload(), createHighlightToDB);
router.get("/artist/:id", getHighlightFromDB);
router.patch("/:id", configureFileUpload(), updateHighlightToDB);
router.delete("/:id", deleteHighlightFromDB);

module.exports = router;
