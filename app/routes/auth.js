const express = require("express");
const controller = require("../controller/auth");

const router = express.Router();

// API calls
router.post("/login", controller.post.login);
router.post("/register", controller.post.register);
router.post("/logout", controller.post.logout);

module.exports = router;
