class APIError extends Error {
  constructor(obj={}) {
    const msg = obj.message || "Something bad happened";
    const status = obj.status || 500;
    super(msg);
    this.message = msg;
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

function INFO() {
  let args = Array.prototype.slice.call(arguments);
  args.unshift(`\x1b[32m[${new Date().toLocaleString()}]\x1b[m`);
  console.log.apply(console, args);
}

function ERROR() {
  let args = Array.prototype.slice.call(arguments);
  args.unshift(`\x1b[31m[${new Date().toLocaleString()}]\x1b[m`);
  console.error.apply(console, args);
}

module.exports = {
  APIError: APIError,
  INFO: INFO,
  ERROR: ERROR,
};
