exports.requireLogin = (req, res, next) => {
  if (!req.session) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated"
    });
  }

  next();
};