module.exports = function protectRoute(req, res, next) {
  if (req.session.userId) next();
  else res.redirect("/auth/signin");
};
