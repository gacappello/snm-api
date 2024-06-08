const { APIError } = require("../utils/api-error");

function isAuth(req) {
  if (req.session.user) return true;
  return false;
}

function requireAuth(req, res, next) {
  try {
    if (isAuth(req)) next();
    else throw new APIError({message: "Unauthorized", status: 401});
  } catch(error) {
    next(error);
  }
}

module.exports = requireAuth;
