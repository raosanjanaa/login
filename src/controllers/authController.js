const axios = require("axios");
const config = require("../config/metaConfig");

exports.facebookLogin = (req, res) => {
  const scope =
    "public_profile,email,pages_show_list,pages_read_engagement";

  const loginUrl =
    `https://www.facebook.com/v21.0/dialog/oauth` +
    `?client_id=${config.APP_ID}` +
    `&redirect_uri=${encodeURIComponent(config.FACEBOOK_REDIRECT_URI)}` +
    `&scope=${scope}`;

  res.redirect(loginUrl);
};

exports.facebookCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("No authorization code received.");
    }

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

    req.session.fbAccessToken = accessToken;

    const profileResponse = await axios.get(
      "https://graph.facebook.com/me",
      {
        params: {
          fields: "id,name,email,picture.width(400).height(400)",
          access_token: accessToken
        }
      }
    );

    req.session.facebookProfile = profileResponse.data;

    res.redirect("/facebook.html");
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Facebook Login Failed"
    });
  }
};