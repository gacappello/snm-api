const express = require("express");
const controller = require("../controller/users");
const errorHandler = require("../middleware/error");

const router = express.Router();

// API calls
router.get("/get/:user", controller.get.getUser);
router.post("/follow/:user", controller.post.followUser);
router.post("/unfollow/:user", controller.post.unfollowUser);
router.put("/update", controller.put.update);
router.use(errorHandler);

// Views
router.get("/show", controller.get.show);
router.get("/show/:user", controller.get.showUser);

module.exports = router;
