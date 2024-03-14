const express = require("express");
const router = express.Router();
const { addTerms, getTerms, updateTerms } = require("../controllers/terms.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const { checkAdmin } = require("../middlewares/checkAdmin");
const { checkUser } = require("../middlewares/checkUser");

router.post( "/create-terms-and-condition", checkAdmin, configureFileUpload(), addTerms);
router.get("/get-terms-and-condition", checkUser, getTerms);
router.patch( "/update-terms-and-condition/:id", checkAdmin, configureFileUpload(), updateTerms );
module.exports = router;
