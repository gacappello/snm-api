const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  WEB_API_PORT: process.env.WEB_API_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  PEPPER: process.env.PEPPER,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CORS_ORIGINS: process.env.CORS_ORIGINS.split(", "),
};
