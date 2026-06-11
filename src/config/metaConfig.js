require("dotenv").config();


console.log("META CONFIG LOADED");
console.log("ENV INSTAGRAM_APP_ID =", process.env.INSTAGRAM_APP_ID);

const BASE_URL = "https://login-aet4.onrender.com";
const REDIRECT_URI = `${BASE_URL}/auth/facebook/callback`;

module.exports = {
  APP_ID: process.env.META_APP_ID,
  APP_SECRET: process.env.META_APP_SECRET,
  INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET: process.env.INSTAGRAM_APP_SECRET,

  FACEBOOK_REDIRECT_URI: REDIRECT_URI,
  INSTAGRAM_REDIRECT_URI: `${BASE_URL}/api/instagram/callback`,
  GRAPH_VERSION: "v21.0"
};