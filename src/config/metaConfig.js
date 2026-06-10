require("dotenv").config();

module.exports = {
  APP_ID: process.env.META_APP_ID,
  APP_SECRET: process.env.META_APP_SECRET,

  // IMPORTANT: single source of truth
  FACEBOOK_REDIRECT_URI: "https://login-aet4.onrender.com/auth/facebook/callback",

  INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET: process.env.INSTAGRAM_APP_SECRET,
  INSTAGRAM_REDIRECT_URI: process.env.INSTAGRAM_REDIRECT_URI
};