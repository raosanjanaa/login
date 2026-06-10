const axios = require("axios");
const config = require("../config/metaConfig");

// =====================
// LOGIN
// =====================
exports.instagramLogin = (req, res) => {
  const redirectUri = config.INSTAGRAM_REDIRECT_URI;

  const url =
    `https://www.instagram.com/oauth/authorize` +
    `?force_reauth=true` +
    `&client_id=${process.env.INSTAGRAM_APP_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights`;

  res.redirect(url);
};

// =====================
// CALLBACK
// =====================
exports.instagramCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("No code received");
    }

    const redirectUri = config.INSTAGRAM_REDIRECT_URI;

    // STEP 1: EXCHANGE CODE FOR TOKEN
    const tokenRes = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID,
        client_secret: process.env.INSTAGRAM_APP_SECRET,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code
      })
    );

    const accessToken = tokenRes.data.access_token;
    const userId = tokenRes.data.user_id;

    // STEP 2: GET PROFILE
    const profileRes = await axios.get(
      `https://graph.instagram.com/${userId}`,
      {
        params: {
          fields: "id,username",
          access_token: accessToken
        }
      }
    );

    // STORE SESSION
    req.session.instagramToken = accessToken;
    req.session.instagramProfile = profileRes.data;

    res.redirect("/instagram.html");

  } catch (error) {
    console.error("INSTAGRAM ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Instagram Login Failed",
      error: error.response?.data || error.message
    });
  }
};

// =====================
// PROFILE API
// =====================
exports.instagramProfile = (req, res) => {
  if (!req.session?.instagramProfile) {
    return res.json({
      success: false
    });
  }

  return res.json({
    success: true,
    data: req.session.instagramProfile
  });
};
const axios = require("axios");

exports.getInstagramMedia = async (req, res) => {
  try {
    const token = req.session.instagramToken;

    if (!token) {
      return res.status(401).json({ success: false });
    }

    const response = await axios.get(
      "https://graph.instagram.com/me/media",
      {
        params: {
          fields: "id,caption,media_url,media_type,permalink",
          access_token: token
        }
      }
    );

    res.json({
      success: true,
      data: response.data.data
    });

  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Failed to load media"
    });
  }
};