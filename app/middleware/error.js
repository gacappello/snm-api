async function handleError(err, req, res, next) {
  const msg = err.message || "Something bad happened";
  const status = err.status || 500; 
  res.json({message: msg, status: status});
}

module.exports = handleError;
