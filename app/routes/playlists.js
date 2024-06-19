const express = require("express");
const controller = require("../controller/playlists");

const router = express.Router();

// API calls
router.get("/get", controller.get.get);
router.get("/get/user/:user", controller.get.getUser);
router.get("/get/:id", controller.get.getId);
router.delete("/delete/:id", controller.delete.deleteId);
router.post("/add", controller.post.add);
router.put("/modify/:id", controller.put.modifyId);
router.post("/like/:id", controller.post.likeId);
router.post("/dislike/:id", controller.post.dislikeId);
router.put("/insert/song/:id", controller.put.insertSongId);
router.put("/remove/song/:id", controller.put.removeSongId);
router.put("/insert/tag/:id", controller.put.insertTagId);
router.put("/remove/tag/:id", controller.put.removeTagId);

module.exports = router;
