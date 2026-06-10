const express = require("express");
const axios = require("axios");

const router = express.Router();

const {
  facebookLogin,
  facebookCallback
} = require("../controllers/facebookController");

// =======================
// FACEBOOK AUTH FLOW
// =======================
router.get("/facebook", facebookLogin);
router.get("/facebook/callback", facebookCallback);

// =======================
// PROFILE
// =======================
router.get("/profile", (req, res) => {
  if (!req.session?.facebookProfile) {
    return res.json({
      success: false,
      message: "Not logged in"
    });
  }

  return res.json({
    success: true,
    data: req.session.facebookProfile
  });
});

// =======================
// PAGES
// =======================
router.get("/pages", async (req, res) => {
  try {
    const token = req.session?.fbAccessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not logged in"
      });
    }

    const response = await axios.get(
      "https://graph.facebook.com/me/accounts",
      {
        params: { access_token: token }
      }
    );

    return res.json({
      success: true,
      data: response.data.data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.response?.data
    });
  }
});

// =======================
// SESSION CHECK
// =======================
router.get("/check-facebook-session", (req, res) => {
  if (!req.session?.fbAccessToken) {
    return res.json({ authenticated: false });
  }

  return res.json({ authenticated: true });
});

module.exports = router;
