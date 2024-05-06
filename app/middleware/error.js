const { ERROR, APIError } = require("../utils/api-error");

function handleError(err, req, res, next) {
  const msg = "Something bad happened";
  const status = 500;
  try {
    if (err instanceof APIError)
      return res.json({ message: err.message, status: err.status });
    ERROR(err.message);
    return res.json({ message: msg, status: status });
  } catch (error) {
    ERROR(error);
    return res.json({ message: msg, status: status });
  }
}

module.exports = handleError;
