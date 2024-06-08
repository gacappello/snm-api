const express = require("express");
const controller = require("../controller/users");

const router = express.Router();

// API calls
router.get("/get/:user", controller.get.getUser);
router.post("/follow/:user", controller.post.followUser);
router.post("/unfollow/:user", controller.post.unfollowUser);
router.put("/update", controller.put.update);

module.exports = router;
