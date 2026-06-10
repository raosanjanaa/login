const axios = require("axios");
const config = require("../config/metaConfig");

// ==============================
// FACEBOOK LOGIN
// ==============================
exports.facebookLogin = (req, res) => {
  const scope =
    "public_profile,email,pages_show_list,pages_read_engagement";

  const loginUrl =
    `https://www.facebook.com/v21.0/dialog/oauth` +
    `?client_id=${config.APP_ID}` +
    `&redirect_uri=${encodeURIComponent(config.FACEBOOK_REDIRECT_URI)}` +
    `&scope=${scope}` +
    `&response_type=code`;

  res.redirect(loginUrl);
};

// ==============================
// FACEBOOK CALLBACK
// ==============================
exports.facebookCallback = async (req, res) => {
  try {
    const { code, error, error_reason } = req.query;

    console.log("FB CALLBACK QUERY:", req.query);
    console.log("REDIRECT URI:", config.FACEBOOK_REDIRECT_URI);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Facebook rejected login",
        error_reason
      });
    }

    if (!code) {
      return res.status(400).send("No code received");
    }

    // ==============================
    // STEP 1: EXCHANGE CODE FOR TOKEN
    // ==============================
    const tokenResponse = await axios.get(
      "https://graph.facebook.com/v21.0/oauth/access_token",
      {
        params: {
          client_id: config.APP_ID,
          client_secret: config.APP_SECRET,

          // MUST MATCH EXACTLY LOGIN redirect_uri
          redirect_uri: config.FACEBOOK_REDIRECT_URI,

          code
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    console.log("ACCESS TOKEN RECEIVED");

    // ==============================
    // STEP 2: GET PROFILE
    // ==============================
    const profileResponse = await axios.get(
      "https://graph.facebook.com/me",
      {
        params: {
          fields: "id,name,email,picture.width(400).height(400)",
          access_token: accessToken
        }
      }
    );

    req.session.fbAccessToken = accessToken;
    req.session.facebookProfile = profileResponse.data;

    return res.redirect("/facebook.html");

  } catch (error) {
    console.error("FACEBOOK ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Facebook Login Failed",
      error: error.response?.data || error.message
    });
  }
};