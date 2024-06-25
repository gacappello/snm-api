const SpotifyWebApi = require("spotify-web-api-node");
const env = require("./environment");

const clientId = env.CLIENT_ID;
const clientSecret = env.CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

module.exports = spotifyApi;
