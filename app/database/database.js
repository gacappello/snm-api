const mongoose = require("mongoose");
const env = require("../environment");

const uri = env.MONGODB_URI;

async function createConnection() {
  return await mongoose.connect(uri);
}

async function closeConnection() {
  return await mongoose.connection.close();
}

module.exports = {
  createConnection: createConnection,
  closeConnection: closeConnection,
};