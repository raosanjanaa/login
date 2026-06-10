const axios = require("axios");

exports.getInstagramAccount = async (req, res) => {

  try {

    const token =
      req.session.instagramAccessToken;

    const pages =
      await axios.get(
        "https://graph.facebook.com/me/accounts",
        {
          params: {
            access_token: token
          }
        }
      );

    const firstPage =
      pages.data.data[0];

    if (!firstPage) {

      return res.json({
        message:
        "No Facebook Page Found"
      });

    }

    const ig =
      await axios.get(
        `https://graph.facebook.com/${firstPage.id}`,
        {
          params: {
            fields:
            "instagram_business_account",
            access_token:
            firstPage.access_token
          }
        }
      );

    if (
      !ig.data.instagram_business_account
    ) {

      return res.json({
        message:
        "No Instagram Account Connected"
      });

    }

    const igId =
      ig.data.instagram_business_account.id;

    const profile =
      await axios.get(
        `https://graph.facebook.com/${igId}`,
        {
          params: {
            fields:
            "id,username,followers_count,follows_count,profile_picture_url",
            access_token:
            firstPage.access_token
          }
        }
      );

    res.json(profile.data);

  } catch (err) {

    console.error(err.response?.data);

    res.status(500).json({
      message:
      "Instagram API Error"
    });

  }

};