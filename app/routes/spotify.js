const express = require("express");
const controller = require("../controller/spotify");

const router = express.Router();

// API Calls
router.get("/albums", controller.get.albums);
router.get("/albums/:id", controller.get.albumsId);
router.get("/albums/:id/tracks", controller.get.albumsIdTracks);

router.get("/artists", controller.get.artists);
router.get("/artists/:id", controller.get.artistsId);
router.get("/artists/:id/albums", controller.get.artistsIdAlbums);
router.get("/artists/:id/top-tracks", controller.get.artistsIdTopTracks);
router.get("/artists/:id/related-artists", controller.get.artistsIdRelated);

router.get("/tracks", controller.get.tracks);
router.get("/tracks/:id", controller.get.tracksId);

router.get("/recommendations", controller.get.recommendations);
router.get(
  "/recommendations/available-genre-seeds",
  controller.get.recommendationsGenres
);

module.exports = router;
