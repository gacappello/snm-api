const validator = require("validator");
const { APIError } = require("../utils/api-error");
const userCredentials = require("../database/models/userCredentials");

async function get_register(req, res, next) {
  res.render("pages/register");
}

async function post_register(req, res, next) {
  const { username, password, email, birth } = req.body;
  try {
    if (req.session.user) return res.redirect("/home");

    if (!username) throw new APIError({ message: "Provide an uername" });
    if (!password) throw new APIError({ message: "Provide a password" });
    if (!email) throw new APIError({ message: "Provide an email" });
    if (!birth) throw new APIError({ message: "Provide a birth date" });

    let record = await userCredentials.findOne({ username: username });
    if (record) throw new APIError({ message: "Username already exist" });
    record = await userCredentials.findOne({ email: email });
    if (record) throw new APIError({ message: "Email already exits" });

    const user = {
      username: username,
      password: password,
      email: email,
      birthDate: birth,
    };

    const doc = new userCredentials(user);
    await doc.save();

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
}

async function get_login(req, res, next) {
  res.render("pages/login");
}

async function post_login(req, res, next) {
  const { cred, password } = req.body;
  try {
    if (req.session.user) return res.redirect("/home");

    if (!cred) throw new APIError({ message: "Provide an auth credential" });
    if (!password) throw new APIError({ message: "Provide a pasword" });

    let record;
    if (validator.isEmail(cred))
      record = await userCredentials.findOne({ email: cred });
    else record = await userCredentials.findOne({ username: cred });
    if (!record || !(await record.compareHash(password))) {
      throw new APIError({ message: "Bad Credentials", status: 401 });
    }

    req.session.userId = record._id;
    res.redirect("/home");
  } catch (error) {
    next(error);
  }
}

async function get_logout(req, res, next) {
  res.render("pages/logout");
}

async function post_logout(req, res, next) {
  try {
    req.session.destroy(function (err) {
      res.redirect("/login");
    });
  } catch (error) {
    next(error);
  }
}

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
