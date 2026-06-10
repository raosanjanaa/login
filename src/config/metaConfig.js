require("dotenv").config();

const BASE_URL = "https://login-aet4.onrender.com";
const REDIRECT_URI = `${BASE_URL}/auth/facebook/callback`;

module.exports = {
  APP_ID: process.env.META_APP_ID,
  APP_SECRET: process.env.META_APP_SECRET,

  FACEBOOK_REDIRECT_URI: REDIRECT_URI
};