const mongoose = require('mongoose');
const env = require('../environment');

const database = env.MONGODB_DATABASE;
const port = env.MONGODB_PORT;
const user = env.MONGODB_USER;
const host = env.MONGODB_HOST;
const password = env.MONGODB_PASSWORD;

async function createConnection() {
  const str = `mongodb://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT&authSource=${database}`;
  return await mongoose.connect(str);
}

async function closeConnection() {
  return await mongoose.connection.close();
}

module.exports = {
  createConnection: createConnection,
  closeConnection: closeConnection,
};
