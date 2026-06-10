const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const facebookRoutes = require("./routes/facebookRoutes");
const instagramRoutes = require("./routes/instagramRoutes");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"
        ],

        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],

        imgSrc: [
          "'self'",
          "data:",
          "https://platform-lookaside.fbsbx.com",
          "https://scontent.xx.fbcdn.net"
        ],

        scriptSrc: [
          "'self'",
          "'unsafe-inline'"
        ]
      }
    }
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(
  express.static(
    path.join(__dirname, "../public")
  )
);

app.use(authRoutes);
app.use(facebookRoutes);
app.use(instagramRoutes);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/index.html")
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});