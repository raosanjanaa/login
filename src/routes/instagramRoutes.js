const express = require("express");
const router = express.Router();

const {
  instagramLogin,
  instagramCallback,
  instagramProfile,
  getInstagramMedia
} = require("../controllers/instagramController");

router.get("/auth", instagramLogin);
router.get("/callback", instagramCallback);
router.get("/profile", instagramProfile);
router.get("/media", getInstagramMedia);

module.exports = router;