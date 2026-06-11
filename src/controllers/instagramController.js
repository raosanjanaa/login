const axios = require("axios");
const config = require("../config/metaConfig");

exports.instagramLogin = (req, res) => {

  const url =
    `https://www.instagram.com/oauth/authorize` +
    `?force_reauth=true` +
    `&client_id=${config.INSTAGRAM_APP_ID}` +
    `&redirect_uri=${encodeURIComponent(
      config.INSTAGRAM_REDIRECT_URI
    )}` +
    `&response_type=code` +
    `&scope=instagram_business_basic`;

  res.redirect(url);

};

exports.instagramCallback = async (
  req,
  res
) => {

  try {

    const { code } = req.query;

    if (!code) {

      return res.status(400).json({
        success: false,
        message: "No authorization code received"
      });

    }

    const tokenRes =
      await axios.post(
        "https://api.instagram.com/oauth/access_token",
        new URLSearchParams({
          client_id:
            config.INSTAGRAM_APP_ID,
          client_secret:
            config.INSTAGRAM_APP_SECRET,
          grant_type:
            "authorization_code",
          redirect_uri:
            config.INSTAGRAM_REDIRECT_URI,
          code
        }).toString(),
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          }
        }
      );

    const accessToken =
      tokenRes.data.access_token;

    const profileRes =
      await axios.get(
        "https://graph.instagram.com/me",
        {
          params: {
            fields:
              "id,username",
            access_token:
              accessToken
          }
        }
      );

    req.session.instagramToken =
      accessToken;

    req.session.instagramProfile =
      profileRes.data;

    req.session.save(() => {

      return res.redirect(
        "/instagram.html"
      );

    });

  } catch (error) {

    console.error(
      error.response?.data ||
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Instagram Login Failed"
    });

  }

};

exports.instagramProfile = (
  req,
  res
) => {

  if (
    !req.session.instagramProfile
  ) {

    return res.json({
      success: false
    });

  }

  return res.json({
    success: true,
    data:
      req.session.instagramProfile
  });

};

exports.getInstagramMedia =
  async (req, res) => {

    try {

      const token =
        req.session.instagramToken;

      if (!token) {

        return res.status(401).json({
          success: false
        });

      }

      const response =
        await axios.get(
          "https://graph.instagram.com/me/media",
          {
            params: {
              fields:
                "id,caption,media_url,thumbnail_url,media_type,permalink",
              access_token:
                token
            }
          }
        );

      return res.json({
        success: true,
        data:
          response.data.data
      });

    } catch (err) {

      console.error(
        err.response?.data ||
        err.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load media"
      });

    }

};

