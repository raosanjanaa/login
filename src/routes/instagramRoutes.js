const express = require("express");

const router = express.Router();

const {
  instagramLogin,
  instagramCallback
} = require("../controllers/instagramController");

const {
  getInstagramAccount
} = require("../controllers/instagramDataController");

router.get(
  "/auth/instagram",
  instagramLogin
);

router.get(
  "/auth/instagram/callback",
  instagramCallback
);

router.get(
  "/api/instagram",
  getInstagramAccount
);

module.exports = router;