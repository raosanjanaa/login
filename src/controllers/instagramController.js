const axios = require("axios");

exports.instagramLogin = (req, res) => {

  const url =
    `https://www.facebook.com/v23.0/dialog/oauth` +
    `?client_id=${process.env.FACEBOOK_APP_ID}` +
    `&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}` +
    `&scope=instagram_basic,pages_show_list,business_management`;

  res.redirect(url);
};

exports.instagramCallback = async (req, res) => {

  try {

    const code = req.query.code;

    const tokenResponse =
      await axios.get(
        "https://graph.facebook.com/v23.0/oauth/access_token",
        {
          params: {
            client_id: process.env.FACEBOOK_APP_ID,
            client_secret: process.env.FACEBOOK_APP_SECRET,
            redirect_uri:
              process.env.INSTAGRAM_REDIRECT_URI,
            code
          }
        }
      );

    req.session.instagramAccessToken =
      tokenResponse.data.access_token;

    res.redirect("/instagram.html");

  } catch (err) {

    console.error(err.response?.data);

    res.send("Instagram Login Failed");
  }

};