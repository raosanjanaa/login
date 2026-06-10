const axios = require("axios");
const config = require("../config/metaConfig");

// ==============================
// FACEBOOK LOGIN REDIRECT
// ==============================
exports.facebookLogin = (req, res) => {
  const scope =
    "public_profile,email,pages_show_list,pages_read_engagement,pages_manage_metadata";

  // simple state for security (you can make it random later)
  const state = "secure_state_123";

  const loginUrl =
    `https://www.facebook.com/v21.0/dialog/oauth` +
    `?client_id=${config.APP_ID}` +
    `&redirect_uri=${encodeURIComponent(config.FACEBOOK_REDIRECT_URI)}` +
    `&scope=${scope}` +
    `&response_type=code` +
    `&state=${state}`;

  res.redirect(loginUrl);
};

// ==============================
// FACEBOOK CALLBACK
// ==============================
exports.facebookCallback = async (req, res) => {
  try {
    const { code, error, error_description } = req.query;

    // If Facebook returns error
    if (error) {
      console.error("FB OAUTH ERROR:", error, error_description);
      return res.status(400).json({
        success: false,
        message: "Facebook rejected login",
        error: error_description || error
      });
    }

    if (!code) {
      return res.status(400).send("No authorization code received.");
    }

    // ==============================
    // STEP 1: EXCHANGE CODE FOR TOKEN
    // ==============================
    const tokenResponse = await axios.get(
      `https://graph.facebook.com/${config.GRAPH_VERSION}/oauth/access_token`,
      {
        params: {
          client_id: config.APP_ID,
          client_secret: config.APP_SECRET,
          redirect_uri: config.FACEBOOK_REDIRECT_URI,
          code
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(500).json({
        success: false,
        message: "Failed to get access token"
      });
    }

    console.log("✅ FB ACCESS TOKEN RECEIVED");

    // ==============================
    // STEP 2: DEBUG TOKEN (VERY IMPORTANT)
    // ==============================
    try {
      const debug = await axios.get(
        `https://graph.facebook.com/debug_token`,
        {
          params: {
            input_token: accessToken,
            access_token: `${config.APP_ID}|${config.APP_SECRET}`
          }
        }
      );

      console.log("🔍 TOKEN DEBUG:", debug.data.data);
    } catch (e) {
      console.log("⚠️ Token debug failed:", e.response?.data || e.message);
    }

    // ==============================
    // STEP 3: GET USER PROFILE
    // ==============================
    const profileResponse = await axios.get(
      `https://graph.facebook.com/me`,
      {
        params: {
          fields: "id,name,email,picture.width(400).height(400)",
          access_token: accessToken
        }
      }
    );

    // ==============================
    // STEP 4: SAVE SESSION
    // ==============================
    req.session.fbAccessToken = accessToken;
    req.session.facebookProfile = profileResponse.data;

    console.log("✅ USER LOGGED IN:", profileResponse.data.name);

    // ==============================
    // STEP 5: REDIRECT
    // ==============================
    return res.redirect("/facebook.html");

  } catch (error) {
    console.error("❌ FACEBOOK LOGIN FAILED:");
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Facebook Login Failed",
      error: error.response?.data || error.message
    });
  }
};