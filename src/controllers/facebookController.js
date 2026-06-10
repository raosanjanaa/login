exports.getPages = async (req, res) => {
  try {
    const token = req.session?.fbAccessToken;

    if (!token) {
      return res.status(401).json({
        message: "Not logged in or token missing"
      });
    }

    const response = await axios.get(
      "https://graph.facebook.com/v20.0/me/accounts",
      {
        params: { access_token: token }
      }
    );

    return res.json(response.data);

  } catch (err) {
    console.error("FB ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      message: "Failed to fetch pages",
      error: err.response?.data
    });
  }
};