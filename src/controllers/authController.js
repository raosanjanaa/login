const axios = require("axios");
const config = require("../config/metaConfig");

const REDIRECT_URI = config.FACEBOOK_REDIRECT_URI;

// LOGIN
exports.facebookLogin = (req, res) => {
  const scope =
    "public_profile,email,pages_show_list,pages_read_engagement";

  const loginUrl =
    `https://www.facebook.com/v21.0/dialog/oauth` +
    `?client_id=${config.APP_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${scope}` +
    `&response_type=code`;

  return res.redirect(loginUrl);
};

// CALLBACK
exports.facebookCallback = async (req, res) => {
  try {
    const { code } = req.query;

    console.log("LOGIN REDIRECT URI:", REDIRECT_URI);

    if (!code) {
      return res.status(400).send("No code received");
    }

    // TOKEN EXCHANGE (MUST MATCH EXACTLY)
    const tokenResponse = await axios.get(
      "https://graph.facebook.com/v21.0/oauth/access_token",
      {
        params: {
          client_id: config.APP_ID,
          client_secret: config.APP_SECRET,
          redirect_uri: REDIRECT_URI, // SAME EXACT VALUE
          code
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const profile = await axios.get("https://graph.facebook.com/me", {
      params: {
        fields: "id,name,email,picture",
        access_token: accessToken
      }
    });

    req.session.fbAccessToken = accessToken;
    req.session.facebookProfile = profile.data;

    return res.redirect("/facebook.html");
  } catch (error) {
    console.error("FB ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Facebook Login Failed",
      error: error.response?.data || error.message
    });
  }
};
