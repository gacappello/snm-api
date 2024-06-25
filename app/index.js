const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");

const { INFO, ERROR, APIError } = require("./utils/api-error");
const swaggerSpec = require("./utils/swagger");

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

const vueLocation = env.VUE_LOCATION;

const store = new session.MemoryStore();

async function tokenRenewal() {
  try {
    INFO("Trying to get auth from Spotify...");
    const o = await spotifyApi.clientCredentialsGrant();
    const token = o.body["access_token"];
    const expires = o.body["expires_in"];
    INFO("Token: " + token);

    spotifyApi.setAccessToken(token);
    INFO(`Expires in: ${expires}s`);
    INFO("Token set");

    setTimeout(tokenRenewal, 3540 * 1000);
  } catch (error) {
    ERROR(error.message);
    setTimeout(tokenRenewal, 10 * 1000);
    ERROR("Retry in 10s");
  }
}

async function initWebAPI() {
  try {
    INFO("Trying connection to database...");
    await database.createConnection();
    INFO("Connected");
    INFO("Auth confirmed");
    await tokenRenewal();
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
app.use(cookieParser());
app.use(
  session({
    secret: sessionSecret,
    cookie: { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 14 },
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
    origin: vueLocation,
    credentials: true,
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/docs.json", (req, res) => {
  res.json(swaggerSpec);
});

// Auth routes
app.use("/", authRoutes);

// From here all routes need auth
app.use(requireAuth);

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
