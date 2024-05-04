const express = require("express");
const controller = require("../controller/users");

const router = express.Router();

// Views
router.get("/show", controller.get.show);
router.get("/show/:user", controller.get.showUser);

// API calls
router.get("/get/:user", controller.get.getUser);
router.post("/follow/:user", controller.post.followUser);
router.post("/unfollow/:user", controller.post.unfollowUser);

module.exports = router;
