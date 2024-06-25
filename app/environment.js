const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  WEB_API_PORT: process.env.WEB_API_PORT,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE,
  MONGODB_PORT: process.env.MONGODB_PORT,
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_HOST: process.env.MONGODB_HOST,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_PROTO: process.env.MONGODB_PROTO,
  PEPPER: process.env.PEPPER,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  VUE_LOCATION: process.env.VUE_LOCATION,
};
