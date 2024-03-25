const express = require("express");
const {
  createHighlightToDB,
  getHighlightFromDB,
  deleteHighlightFromDB,
  updateHighlightToDB,
} = require("../controllers/highlight.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const { checkUser } = require("../middlewares/checkUser");
const router = express.Router();

router.post("/create-highlight", checkUser, configureFileUpload(), createHighlightToDB);
router.get("/artist/:id", checkUser, getHighlightFromDB);
router.patch("/:id", checkUser, configureFileUpload(), updateHighlightToDB);
router.delete("/:id", checkUser, deleteHighlightFromDB);

module.exports = router;
