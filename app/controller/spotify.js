const { APIError } = require("../utils/api-error");
const spotifyApi = require("../spotify");

async function get_artists_id(req, res, next) {
  const { id } = req.params;
  try {
    await spotifyApi
      .getArtist(id)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({ message: err.message, status: err.status });
        }
      )
      .catch(function (err) {
        next(err);
      });
  } catch (error) {
    next(error);
  }
}

async function post_artists_id_top(req, res, next) {
  const { id } = req.params;
  const { market } = req.body;
  const options = {
    market: market,
  };
  try {
    await spotifyApi
      .getArtistTopTracks(id, options)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({ message: err.message, status: err.status });
        }
      )
      .catch(function (err) {
        next(err);
      });
  } catch (error) {
    next(error);
  }
}

async function post_tracks(req, res, next) {
  const { ids, market } = req.body;
  const options = {
    market: market,
  };
  try {
    await spotifyApi
      .getTracks(ids, options)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({
            message: err.message,
            status: err.status,
          });
        }
      )
      .catch(function (err) {
        next(err);
      });
  } catch (error) {
    next(error);
  }
}

async function post_tracks_id(req, res, next) {
  const { id } = req.params;
  const { market } = req.body;
  const options = {
    market: market,
  };
  try {
    await spotifyApi
      .getTrack(id, options)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({ message: err.message, status: err.status });
        }
      )
      .catch(function (err) {
        next(err);
      });
  } catch (error) {
    next(error);
  }
}

async function post_search(req, res, next) {
  const { q, types, market, limit, offset } = req.body;
  const options = {
    market: market,
    limit: limit,
    offset: offset,
    include_external: "audio",
  };

  try {
    await spotifyApi
      .search(q, types, options)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({ message: err.message, status: err.status });
        }
      )
      .catch(function (err) {
        next(err);
      });
  } catch (error) {
    next(error);
  }
}

async function post_recommendations(req, res, next) {
  const { limit, seed_artists, seed_genres, seed_tracks } = req.body;
  const options = {
    limit: limit,
    seed_artists: seed_artists,
    seed_genres: seed_genres,
    seed_tracks: seed_tracks,
  };
  try {
    await spotifyApi
      .getRecommendations(options)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({ message: err.message, status: err.status });
        }
      )
      .catch(function (err) {
        next(err);
      });
  } catch (error) {
    next(error);
  }
}

async function get_recommendations_genres(req, res, next) {
  try {
    await spotifyApi
      .getAvailableGenreSeeds()
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({ message: err.message, status: err.status });
        }
      )
      .catch(function (err) {
        next(err);
      });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get: {
    artistsId: get_artists_id,

    recommendationsGenres: get_recommendations_genres,
  },
  post: {
    artistsIdTopTracks: post_artists_id_top,

    tracks: post_tracks,
    tracksId: post_tracks_id,

    search: post_search,

    recommendations: post_recommendations,
  },
};
