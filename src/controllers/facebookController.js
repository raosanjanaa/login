const axios = require("axios");

exports.getPages = async (req, res) => {

    try {

        const token =
            req.session.fbAccessToken;

        if (!token) {

            return res.status(401).json({
                message: "Not logged in"
            });

        }

        const response =
            await axios.get(
                "https://graph.facebook.com/me/accounts",
                {
                    params: {
                        access_token: token
                    }
                }
            );

        res.json(response.data);

    } catch (err) {

        console.error(err.response?.data);

        res.status(500).json({
            message: "Failed"
        });

    }

};