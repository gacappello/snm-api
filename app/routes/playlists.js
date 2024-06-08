const express = require("express");
const controller = require("../controller/playlists");

const router = express.Router();

// API calls
router.get("/get", controller.get.get);
router.get("/get/:user", controller.get.getUser);
router.get("/get/:id", controller.get.getId);
router.delete("/delete", controller.delete.deleteId);
router.post("/add", controller.post.add);
router.put("/modify", controller.put.modifyId);

module.exports = router;
