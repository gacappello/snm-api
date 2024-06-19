const { APIError } = require("../utils/api-error");
const spotifyApi = require("../spotify");

async function post_albums(req, res, next) {
  const { ids, market } = req.body;
  const options = {
    market: market,
  };
  spotifyApi
    .getAlbums(ids, options)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({
          message: 'Provide a valid non-empty "ids" array of strings',
          status: err.status,
        });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function post_albums_id(req, res, next) {
  const { id } = req.params;
  const { market } = req.body;
  const options = {
    market: market,
  };
  spotifyApi
    .getAlbum(id, options)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({ message: "Bad request", status: err.status });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function post_albums_id_tracks(req, res, next) {
  const { id } = req.params;
  const { market, limit, offset } = req.body;
  const options = {
    market: market,
    limit: limit,
    offset: offset,
  };
  spotifyApi
    .getAlbumTracks(id, options)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({ message: "Bad request", status: err.status });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function post_artists(req, res, next) {
  const { ids } = req.body;
  spotifyApi
    .getArtists(ids)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({
          message: 'Provide a valid non-empty "ids" array of strings',
          status: err.status,
        });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function get_artists_id(req, res, next) {
  const { id } = req.params;
  spotifyApi
    .getArtist(id)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({ message: "Bad request", status: err.status });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function post_artists_id_albums(req, res, next) {
  const { id } = req.params;
  const { include_groups, market, limit, offset } = req.body;
  const options = {
    include_groups: include_groups,
    market: market,
    limit: limit,
    offset: offset,
  };
  spotifyApi
    .getArtistAlbums(id, options)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({ message: "Bad request", status: err.status });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function post_artists_id_top(req, res, next) {
  const { id } = req.params;
  const { market } = req.body;
  const options = {
    market: market,
  };
  spotifyApi
    .getArtistTopTracks(id, options)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({ message: "Bad request", status: err.status });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function get_artists_id_related(req, res, next) {
  const { id } = req.params;
  spotifyApi
    .getArtistRelatedArtists(id)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({ message: "Bad request", status: err.status });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function post_tracks(req, res, next) {
  const { ids, market } = req.body;
  const options = {
    market: market,
  };
  try {
    spotifyApi
      .getTracks(ids, options)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({
            message: 'Provide a valid non-empty "ids" array of strings',
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
    spotifyApi
      .getTrack(id, options)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          throw new APIError({ message: "Bad request", status: err.status });
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
  const { limit, market, seed_artists, seed_genres, seed_tracks } = req.body;
  const options = {
    limit: limit,
    market: market,
    seed_artists: seed_artists,
    seed_genres: seed_genres,
    seed_tracks: seed_tracks,
  };
  spotifyApi
    .getRecommendations(options)
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({ message: "Bad request", status: err.status });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

async function get_recommendations_genres(req, res, next) {
  spotifyApi
    .getAvailableGenreSeeds()
    .then(
      function (data) {
        res.json(data);
      },
      function (err) {
        throw new APIError({ message: "Bad request", status: err.status });
      }
    )
    .catch(function (err) {
      next(err);
    });
}

module.exports = {
  get: {
    artistsId: get_artists_id,
    artistsIdRelated: get_artists_id_related,

    recommendationsGenres: get_recommendations_genres,
  },
  post: {
    albums: post_albums,
    albumsId: post_albums_id,
    albumsIdTracks: post_albums_id_tracks,

    artists: post_artists,
    artistsIdAlbums: post_artists_id_albums,
    artistsIdTopTracks: post_artists_id_top,

    tracks: post_tracks,
    tracksId: post_tracks_id,

    recommendations: post_recommendations,
  },
};
