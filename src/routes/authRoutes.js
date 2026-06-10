const express = require("express");
const router = express.Router();

const {
  facebookLogin,
  facebookCallback
} = require("../controllers/facebookController");

// ✅ LOGIN (IMPORTANT: NO /auth prefix here)
router.get("/facebook", facebookLogin);

// CALLBACK
router.get("/facebook/callback", facebookCallback);

module.exports = router;