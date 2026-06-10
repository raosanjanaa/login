require("dotenv").config();

const BASE_URL = "https://login-aet4.onrender.com";

module.exports = {
  APP_ID: process.env.META_APP_ID,
  APP_SECRET: process.env.META_APP_SECRET,

  // SINGLE SOURCE OF TRUTH
  FACEBOOK_REDIRECT_URI: `${BASE_URL}/auth/facebook/callback`,

  INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET: process.env.INSTAGRAM_APP_SECRET,
  INSTAGRAM_REDIRECT_URI: process.env.INSTAGRAM_REDIRECT_URI
};