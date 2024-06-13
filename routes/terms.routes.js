const express = require("express");
const router = express.Router();
const {
  addTerms,
  getTerms,
  updateTerms,
} = require("../controllers/terms.controller");
const configureFileUpload = require("../middlewares/fileUpload");

const auth = require("../middlewares/auth");
const { USER_ROLE } = require("../enums/user");

router.post(
  "/create-terms-and-condition",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  addTerms
);
router.get(
  "/get-terms-and-condition",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getTerms
);
router.patch(
  "/update-terms-and-condition/:id",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  updateTerms
);
exports.TermsRoutes = router;
