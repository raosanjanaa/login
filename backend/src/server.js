const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "../../public")
  )
);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../public/index.html")
  );
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running on port ${process.env.PORT || 5000}`
  );
});