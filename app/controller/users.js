const { APIError } = require("../utils/api-error");
const userCredentials = require("../database/models/userCredentials");

async function get_show(req, res, next) {}

async function get_show_user(req, res, next) {}

async function get_get_user(req, res, next) {
  const user = req.params.user;
  try {
    const record = await userCredentials.findOne({ username: user });
    if (!record) return res.json({ user: null });
    const safe = record.getSafe();
    res.json({ user: safe });
  } catch (error) {
    next(error);
  }
}

async function post_follow_user(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const user = req.params.user;
  try {
    const me = await userCredentials.findById(sessionId);
    if (!me) throw new APIError();

    const record = await userCredentials.findOne({ username: user });
    if (!record) throw new APIError("Username is unknown");

    if (sessionUser.equals(user)) return res.send();
    if (!me.follows.includes(user)) {
      me.follows.push(user);
      await me.save();
    }

    res.send();
  } catch (error) {
    next(error);
  }
}

async function post_unfollow_user(req, res, next) {
  const user = req.params.user;
  const sessionId = req.session.userId;
  try {
    const owner = await userCredentials.findById(sessionId);
    const record = await userCredentials.findOne({ username: user });
    if (!owner) throw new APIError();
    if (!record) throw new APIError("Username is unknown");

    if (owner._id.equals(record._id)) throw new APIError();
    if (owner.follows.includes(user)) {
      owner.follows = owner.follows.filter(function (item) {
        return item !== user;
      });
      await owner.save();
    }

    res.send();
  } catch (error) {
    next(error);
  }
}

async function put_update(req, res, next) {
  const sessionId = req.session.userId;
  const { firstName, lastName, genres } = req.params;

  const update = {};
  if (firstName) update.firstName = firstName;
  if (lastName) update.lastName = lastName;
  if (genres) update.genres = lastName;

  try {
    const owner = await userCredentials.findByIdAndUpdate(sessionId, update, {
      new: true,
    });
    if (!owner) throw new APIError();

    res.send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get: {
    show: get_show,
    showUser: get_show_user,
    getUser: get_get_user,
  },
  post: {
    followUser: post_follow_user,
    unfollowUser: post_unfollow_user,
  },
  put: {
    update: put_update,
  },
};
