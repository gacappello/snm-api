const express = require("express");
const controller = require("../controller/auth");

const router = express.Router();

router.get("/login", controller.get.login);
router.post("/login", controller.post.login);

router.get("/register", controller.get.register);
router.post("/register", controller.post.register);

router.get("/logout", controller.get.logout);
router.post("/logout", controller.post.logout);

module.exports = router;
