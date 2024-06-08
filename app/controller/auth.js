const validator = require("validator");
const { APIError } = require("../utils/api-error");
const userCredentials = require("../database/models/userCredentials");

async function post_register(req, res, next) {
  const { username, password, email, birth, firstName, lastName } = req.body;
  try {
    if (req.session.user) return res.status(204).send();

    if (!username) throw new APIError({ message: "Provide an uername" });
    if (!password) throw new APIError({ message: "Provide a password" });
    if (!email) throw new APIError({ message: "Provide an email" });
    if (!birth) throw new APIError({ message: "Provide a birth date" });
    if (!firstName) throw new APIError({ message: "Provide a first name" });
    if (!lastName) throw new APIError({ message: "Provide a last name" });

    let record = await userCredentials.findOne({ username: username });
    if (record) throw new APIError({ message: "Username already exist" });
    record = await userCredentials.findOne({ email: email });
    if (record) throw new APIError({ message: "Email already exits" });

    const user = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthDate: birth,
    };

    const doc = new userCredentials(user);
    await doc.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function post_login(req, res, next) {
  const { cred, password } = req.body;
  try {
    if (req.session.user) {
      return res.status(204).send();
    }

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
    req.session.user = record.username;
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function post_logout(req, res, next) {
  try {
    req.session.destroy(function (err) {
      if (err) throw new APIError({ message: err.message });
      res.status(204).send();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  post: {
    login: post_login,
    logout: post_logout,
    register: post_register,
  },
};
