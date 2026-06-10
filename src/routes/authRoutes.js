const express = require("express");
const router = express.Router();

const {
  facebookLogin,
  facebookCallback
} = require("../controllers/authController");

// FACEBOOK LOGIN
router.get("/facebook", facebookLogin);

// FACEBOOK CALLBACK
router.get("/facebook/callback", facebookCallback);

// LOGOUT (FIXED)
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed"
      });
    }

    res.clearCookie("connect.sid");

    return res.redirect("/");
  });
});

module.exports = router;