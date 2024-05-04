const express = require("express");
const controller = require("../controller/playlists")

const router = express.Router();

// Views
router.get("/show", controller.get.show);
router.get("/show/:user", controller.get.showUser);
router.get("/show/:user/:id", controller.get.showUserId);

// API calls
router.get("/get", controller.get.get);
router.get("/get/:user", controller.get.getUser);
router.get("/get/:user/:id", controller.get.getUserId);

router.delete("/delete", controller.delete.delete);
router.post("/add", controller.post.add);
router.put("/modify", controller.put.modify);

module.exports = router;