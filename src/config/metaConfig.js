require("dotenv").config();

module.exports = {
  APP_ID: process.env.META_APP_ID,
  APP_SECRET: process.env.META_APP_SECRET,
  GRAPH_VERSION: process.env.GRAPH_API_VERSION,
  FACEBOOK_REDIRECT_URI: process.env.FACEBOOK_REDIRECT_URI,
  INSTAGRAM_REDIRECT_URI: process.env.INSTAGRAM_REDIRECT_URI
};