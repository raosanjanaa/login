const express = require("express");
const router = express.Router();

const {
  instagramLogin,
  instagramCallback,
  instagramProfile
} = require("../controllers/instagramController");

// LOGIN
router.get("/auth", instagramLogin);

// CALLBACK
router.get("/callback", instagramCallback);

// PROFILE API
router.get("/profile", instagramProfile);
router.get("/media", instagramController.getInstagramMedia);

module.exports = router;