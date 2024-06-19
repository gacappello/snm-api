const express = require("express");
const controller = require("../controller/spotify");

const router = express.Router();

// API Calls
router.post("/albums", controller.post.albums);
router.post("/albums/:id", controller.post.albumsId);
router.post("/albums/:id/tracks", controller.post.albumsIdTracks);

router.post("/artists", controller.post.artists);
router.get("/artists/:id", controller.get.artistsId);
router.post("/artists/:id/albums", controller.post.artistsIdAlbums);
router.post("/artists/:id/top-tracks", controller.post.artistsIdTopTracks);
router.get("/artists/:id/related-artists", controller.get.artistsIdRelated);

router.post("/tracks", controller.post.tracks);
router.post("/tracks/:id", controller.post.tracksId);

router.post("/recommendations", controller.post.recommendations);
router.get(
  "/recommendations/available-genre-seeds",
  controller.get.recommendationsGenres
);

module.exports = router;
