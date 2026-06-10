const express = require("express");

const router = express.Router();

const {
    getPages
} = require("../controllers/facebookController");

router.get("/api/profile", (req, res) => {

    if (!req.session.facebookProfile) {

        return res.status(401).json({
            authenticated: false
        });

    }

    res.json(
        req.session.facebookProfile
    );

});

router.get(
    "/api/pages",
    getPages
);

router.get(
    "/api/check-facebook-session",
    (req, res) => {

        res.json({
            authenticated:
                !!req.session.facebookProfile
        });

    }
);

module.exports = router;