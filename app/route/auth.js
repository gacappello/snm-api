const express = require("express");
const controller = require("../controller/auth");
const errorHandler = require("../middleware/error")

const router = express.Router();

// API calls
router.post("/login", controller.post.login);
router.post("/register", controller.post.register);
router.post("/logout", controller.post.logout);
router.use(errorHandler);

// Views
router.get("/login", controller.get.login);
router.get("/register", controller.get.register);
router.get("/logout", controller.get.logout);

module.exports = router;
