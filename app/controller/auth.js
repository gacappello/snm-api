const mongoose = require("mongoose");
const userCredentials = require("../database/models/userCredentials");

async function get_register(req, res) {
  res.render("pages/register");
}

async function post_register(req, res) {
  const { username, password, email } = req.body;
  const user = await userCredentials.findOne({ username: username });
}

async function get_login(req, res) {
  res.render("pages/login");
}

async function post_login(req, res) {
  const { cred, password } = req.body;
}

async function get_logout(req, res) {
  res.render("pages/logout");
}

async function post_logout(req, res) {}

module.exports = {
  get: {
    login: get_login,
    logout: get_logout,
    register: get_register,
  },

  post: {
    login: post_login,
    logout: post_logout,
    register: post_register,
  },
};
