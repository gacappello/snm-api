const express = require("express");
const bodyParser = require("body-parser");

const env = require("./environment");
const database = require("./database/database");

const app = express();

const webPort = env.WEB_API_PORT;

function INFO(info) {
  console.log(info);
}

function ERROR(error) {
  console.error(error);
}

async function initWebAPI() {
  try {
    INFO("Trying connection to database...");
    await database.createConnection();
    INFO("Connected");
  } catch (error) {
    ERROR(error.message);
    process.exit(1);
  }
}

async function freeWebAPI() {
  await database.closeConnection();
  INFO("Exited");
  process.exit(0);
}

process.on("SIGTERM", freeWebAPI);
process.on("SIGINT", freeWebAPI);

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send("CIAO");
})

app.listen(webPort, initWebAPI).on("error", function (error) {
  ERROR(error.message);
});
