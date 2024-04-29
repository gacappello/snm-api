function isAuth(req) {
  if (req.session.authorized) return true;
  return false;
}

function requireAuth(req, res, next) {
  if (isAuth(req)) next();
  else res.redirect("/login");
}

module.exports = {
  requireAuth: requireAuth,
};
