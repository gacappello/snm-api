const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

router.get("/login", authController.get.login);
router.post("/login", authController.post.login);

router.get("/logout", authController.get.logout);
router.post("/logout", authController.post.logout);

module.exports = router;
