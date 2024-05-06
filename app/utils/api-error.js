class APIError extends Error {
  constructor(obj) {
    super(obj.message || "Something bad happened");
    this.message = obj.message || "Something bad happened";
    this.status = obj.status || 500;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

function INFO() {
  let args = Array.prototype.slice.call(arguments);
  args.unshift(`[${new Date().toLocaleString()}]`);
  console.log.apply(console, args);
}

function ERROR() {
  let args = Array.prototype.slice.call(arguments);
  args.unshift(`[${new Date().toLocaleString()}]`);
  console.error.apply(console, args);
}

module.exports = {
  APIError: APIError,
  INFO: INFO,
  ERROR: ERROR,
};
