const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const authMW = require("./middleware/auth");

const authRoutes = require("./route/auth");
const playlistsRoutes = require("./route/playlists");
const usersRoutes = require("./route/users");

const env = require("./environment");
const database = require("./database/database");

const app = express();

const webPort = env.WEB_API_PORT;
const sessionSecret = env.SESSION_SECRET;

const store = new session.MemoryStore();

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

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(
  session({
    secret: sessionSecret,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: true,
    store: store,
  }),
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Auth routes
app.use("/", authRoutes);

// From here all routes need auth
app.use(authMW.requireAuth);

// Other routes
app.use("/playlists", playlistsRoutes);
app.use("/users", usersRoutes);

// Home routes
app.get("/", function (req, res) {
  res.redirect("/home");
});

app.get("/home", function (req, res) {
  res.render("pages/home");
});

app.get("/not_found", function (req, res) {
  res.render("pages/not_found");
});

// Default route
app.use((req, res, next) => {
  res.redirect("/not_found");
});

app.listen(webPort, initWebAPI).on("error", function (error) {
  ERROR(error.message);
});
