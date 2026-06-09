const express = require("express");
const axios = require("axios");
const router = express.Router();

/*
|--------------------------------------------------------------------------
| FACEBOOK LOGIN
|--------------------------------------------------------------------------
*/
router.get("/facebook", (req, res) => {
  const authUrl =
    `https://www.facebook.com/v23.0/dialog/oauth` +
    `?client_id=${process.env.META_APP_ID}` +
    `&redirect_uri=${encodeURIComponent(
      process.env.FACEBOOK_REDIRECT_URI
    )}` +
    `&scope=email,public_profile`;

  res.redirect(authUrl);
});

/*
|--------------------------------------------------------------------------
| FACEBOOK CALLBACK
|--------------------------------------------------------------------------
*/
router.get("/facebook/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.send("No authorization code received");
    }

    // Exchange code for access token
    const tokenResponse = await axios.get(
      "https://graph.facebook.com/v23.0/oauth/access_token",
      {
        params: {
          client_id: process.env.META_APP_ID,
          client_secret: process.env.META_APP_SECRET,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
          code,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch profile
    const profileResponse = await axios.get(
      "https://graph.facebook.com/me",
      {
        params: {
          fields: "id,name,email,picture.width(300).height(300)",
          access_token: accessToken,
        },
      }
    );

    const user = profileResponse.data;

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Profile</title>

        <style>
          body{
            background:#050505;
            color:white;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:Arial;
          }

          .card{
            width:420px;
            padding:30px;
            border-radius:25px;
            background:rgba(255,255,255,.08);
            backdrop-filter:blur(20px);
            text-align:center;
          }

          img{
            width:120px;
            height:120px;
            border-radius:50%;
            margin-bottom:20px;
          }
        </style>
      </head>

      <body>

      <div class="card">

        <img src="${user.picture?.data?.url}" />

        <h2>${user.name}</h2>

        <p>${user.email || "Email not available"}</p>

        <p>ID: ${user.id}</p>

      </div>

      </body>
      </html>
    `);
  } catch (error) {
    console.error(error.response?.data || error);

    res.send(`
      <h1>Login Failed</h1>
      <pre>${JSON.stringify(
        error.response?.data || error.message,
        null,
        2
      )}</pre>
    `);
  }
});

/*
|--------------------------------------------------------------------------
| INSTAGRAM LOGIN
|--------------------------------------------------------------------------
*/
router.get("/instagram", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <body style="
      background:#050505;
      color:white;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      font-family:Arial;
    ">
      <h1>Instagram Login Coming Soon 🚀</h1>
    </body>
    </html>
  `);
});

/*
|--------------------------------------------------------------------------
| INSTAGRAM CALLBACK
|--------------------------------------------------------------------------
*/
router.get("/instagram/callback", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <body style="
      background:#050505;
      color:white;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      font-family:Arial;
    ">
      <h1>Instagram Login Success 🎉</h1>
    </body>
    </html>
  `);
});

module.exports = router;