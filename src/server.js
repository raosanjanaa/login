const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const facebookRoutes = require("./routes/facebookRoutes");
const instagramRoutes = require("./routes/instagramRoutes");

const app = express();

/*
=========================
TRUST PROXY
=========================
*/
app.set("trust proxy", 1);

/*
=========================
HELMET
=========================
*/
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  })
);

/*
=========================
BODY PARSER
=========================
*/
app.use(express.json());

/*
=========================
SESSION
=========================
*/
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

/*
=========================
STATIC FILES
=========================
*/
app.use(express.static(path.join(__dirname, "../public")));

/*
=========================
PAGES (CLEAN URLS)
=========================
*/
app.use(express.static(path.join(__dirname, "../public")));

/*
=========================
ROUTES
=========================
*/
app.use("/auth", authRoutes);
app.use("/api", facebookRoutes);
app.use("/api/instagram", instagramRoutes);

/*
=========================
HOME
=========================
*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

/*
=========================
START SERVER
=========================
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});