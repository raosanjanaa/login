const express = require("express");
const router = express.Router();

const {
  facebookLogin,
  facebookCallback
} = require("../controllers/facebookController");

// ==============================
// FACEBOOK LOGIN
// ==============================
router.get("/auth/facebook", facebookLogin);

// ==============================
// FACEBOOK CALLBACK
// ==============================
router.get("/auth/facebook/callback", facebookCallback);

module.exports = router;