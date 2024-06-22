const validator = require("validator");
const { APIError } = require("../utils/api-error");
const userCredentials = require("../database/models/userCredentials");

async function post_register(req, res, next) {
  const { username, password, email, birth, firstName, lastName, genres } =
    req.body;
  try {
    if (req.session.user) return res.status(204).send();

    if (!username)
      throw new APIError({ message: "Provide an uername", status: 400 });
    if (!password)
      throw new APIError({ message: "Provide a password", status: 400 });
    if (!email)
      throw new APIError({ message: "Provide an email", status: 400 });
    if (!birth)
      throw new APIError({ message: "Provide a birth date", status: 400 });
    if (!firstName)
      throw new APIError({ message: "Provide a first name", status: 400 });
    if (!lastName)
      throw new APIError({ message: "Provide a last name", status: 400 });

    let record = await userCredentials.findOne({ username: username });
    if (record)
      throw new APIError({ message: "Username already exist", status: 403 });

    record = await userCredentials.findOne({ email: email });
    if (record)
      throw new APIError({ message: "Email already exits", status: 403 });

    const user = {
      username: username.toLowerCase(),
      password: password.toLowerCase(),
      email: email.toLowerCase(),
      firstName: firstName,
      lastName: lastName,
      birthDate: birth,
      genres: genres,
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

    if (!cred)
      throw new APIError({
        message: "Provide an auth credential",
        status: 400,
      });
    if (!password)
      throw new APIError({ message: "Provide a pasword", status: 400 });

    let record;
    if (validator.isEmail(cred.toLowerCase()))
      record = await userCredentials.findOne({ email: cred.toLowerCase() });
    else
      record = await userCredentials.findOne({ username: cred.toLowerCase() });
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
