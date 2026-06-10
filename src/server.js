const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const facebookRoutes = require("./routes/facebookRoutes");
const instagramRoutes = require("./routes/instagramRoutes");
const app = express();

/* =========================
   TRUST PROXY (IMPORTANT FOR RENDER)
========================= */
app.set("trust proxy", 1);

/* =========================
   SECURITY HEADERS
========================= */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: [
          "'self'",
          "data:",
          "https://platform-lookaside.fbsbx.com",
          "https://scontent.xx.fbcdn.net"
        ],
        scriptSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  })
);

/* =========================
   BODY PARSER
========================= */
app.use(express.json());

/* =========================
   SESSION CONFIG (FIXED)
========================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true, // IMPORTANT for Render
    cookie: {
      secure: true,      // HTTPS only (Render)
      sameSite: "none",  // REQUIRED for OAuth
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

/* =========================
   STATIC FILES
========================= */
app.use(express.static(path.join(__dirname, "../public")));

/* =========================
   ROUTES
========================= */
app.use("/auth", authRoutes);
app.use("/api", facebookRoutes);
app.use("/api/instagram", instagramRoutes);
/* =========================
   HOME ROUTE
========================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
console.log("Auth routes loaded");