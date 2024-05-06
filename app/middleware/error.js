const { ERROR, APIError } = require("../utils/api-error");

function handleError(err, req, res, next) {
  const msg = "Something bad happened";
  const status = 500;
  try {
    if (err instanceof APIError)
      return res.status(status).json({ message: err.message, status: err.status, error: true });
    ERROR(err);
    return res.status(status).json({ message: msg, status: status, error: true });
  } catch (error) {
    ERROR(error);
    return res.status(status).json({ message: msg, status: status, error: true });
  }
}

module.exports = handleError;
