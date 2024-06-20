const { APIError } = require("../utils/api-error");
const userCredentials = require("../database/models/userCredentials");

async function get_get_user(req, res, next) {
  const { user } = req.params;
  try {
    const record = await userCredentials.findOne({ username: user });
    if (!record)
      throw new APIError({ message: "Username is unknown", status: 404 });

    const safe = await record.getSafe();
    res.json({ user: safe });
  } catch (error) {
    next(error);
  }
}

async function get_get_me(req, res, next) {
  const sessionId = req.session.userId;
  try {
    const record = await userCredentials.findById(sessionId);
    if (!record) throw new APIError();

    const safe = await record.getSafe();
    res.json({ user: safe });
  } catch (error) {
    next(error);
  }
}

async function post_follow_user(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const { user } = req.params;
  try {
    if (sessionUser === user)
      throw new APIError({ message: "Cannot follow yourself", status: 400 });

    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    const userExists = await userCredentials.exists({ username: user });
    if (!userExists)
      throw new APIError({ message: "Username is unknown", status: 404 });

    await userCredentials.findByIdAndUpdate(sessionId, {
      $addToSet: { follows: user },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function post_unfollow_user(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const { user } = req.params;
  try {
    if (sessionUser === user)
      throw new APIError({ message: "Cannot unfollow yourself", status: 400 });

    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    await userCredentials.findByIdAndUpdate(sessionId, {
      $pull: { follows: user },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function put_update(req, res, next) {
  const sessionId = req.session.userId;
  const { firstName, lastName, genres, bio } = req.body;

  const update = {};
  if (firstName) update.firstName = firstName;
  if (lastName) update.lastName = lastName;
  if (genres) update.genres = lastName;
  if (bio) update.bio = bio;

  try {
    const owner = await userCredentials.findByIdAndUpdate(sessionId, update, {
      new: true,
      runValidators: true,
    });
    if (!owner) throw new APIError();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get: {
    getUser: get_get_user,
    getMe: get_get_me,
  },
  post: {
    followUser: post_follow_user,
    unfollowUser: post_unfollow_user,
  },
  put: {
    update: put_update,
  },
};
