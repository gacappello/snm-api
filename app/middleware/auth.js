function isAuth(req) {
  if (req.session.user) return true;
  return false;
}

function requireAuth(req, res, next) {
  if (isAuth(req)) next();
  else res.redirect("/login");
}

module.exports = {
  requireAuth: requireAuth,
};
