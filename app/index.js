const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const { INFO, ERROR, APIError } = require("./utils/api-error");

const requireAuth = require("./middleware/auth");
const errorHandler = require("./middleware/error");

const authRoutes = require("./routes/auth");
const playlistsRoutes = require("./routes/playlists");
const usersRoutes = require("./routes/users");
const spotifyRoutes = require("./routes/spotify");

const env = require("./environment");
const database = require("./database/database");

const spotifyApi = require("./spotify");

const app = express();

const webPort = env.WEB_API_PORT;
const sessionSecret = env.SESSION_SECRET;

const vuePort = env.VUE_PORT;
const vueHost = env.VUE_HOST;

const store = new session.MemoryStore();

async function initWebAPI() {
  try {
    INFO("Trying connection to database...");
    await database.createConnection();
    INFO("Connected");
    INFO("Trying to get auth from Spotify...");
    const o = await spotifyApi.clientCredentialsGrant();
    INFO("Token: " + o.body["access_token"]);
    spotifyApi.setAccessToken(o.body["access_token"]);
    INFO("Auth confirmed");
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
app.use(
  session({
    secret: sessionSecret,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 },
    saveUninitialized: false,
    store: store,
  })
);

app.use(function (req, res, next) {
  INFO(`ip: ${req.ip} at: ${req.originalUrl}`);
  next();
});

app.use(
  cors({
    origin: `http://${vueHost}:${vuePort}`,
    credentials: true,
  })
);

// Auth routes
app.use("/", authRoutes);

// From here all routes need auth
// app.use(requireAuth);

// Other routes
app.use("/playlists", playlistsRoutes);
app.use("/users", usersRoutes);
app.use("/sapi", spotifyRoutes);

// Default route
app.use((req, res, next) => {
  next(new APIError({ message: "Not Found", status: 404 }));
});

app.use(errorHandler);

app.listen(webPort, initWebAPI).on("error", function (error) {
  ERROR(error.message);
});
