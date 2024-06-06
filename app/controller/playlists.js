const playlists = require("../database/models/playlists");
const userCredentials = require("../database/models/userCredentials");

async function get_show(req, res, next) {}

async function get_show_user(req, res, next) {}

async function get_show_user_id(req, res, next) {}

async function get_get(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  try {
    const me = await userCredentials.findById(sessionId);
    if (!me) throw new APIError();

    const all = {
      myPlaylists: [],
      friendsPlaylists: [],
      othersPlaylists: [],
    };

    const myPlaylists = await playlists.find({user: sessionUser});
    for (pl of myPlaylists) {
      all.myPlaylists.push(pl);
    }

    for (follow of me.follows) {
      const record = await playlists
        .find({user: follow})
        .where("access")
        .ne("private")
        .exec();
      for (pl of record) {
        all.friendsPlaylists.push(pl);
      }
    }

    const othersPlaylists = await playlists
      .find({})
      .where("user")
      .ne(sessionId)
      .and("access")
      .equals("public")
      .exec();

    for (pl of othersPlaylists) {
      all.othersPlaylists.push(pl);
    }

    res.json(all);
  } catch (error) {
    next(error);
  }
}

async function get_get_user(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const user = req.params.user;
  try {
    const me = await userCredentials.findById(sessionId);
    if (!me) throw new APIError();

    const record = await all.find({user: user});
    if (!record) throw new APIError("Username not found");

    const pub = [];
    const pri = [];
    const fol = [];

    for (pl of record) {
      if (pl.access.equals("public"))
        pub.push(pl);
      if (pl.access.equals("private"))
        pri.push(pl);
      if (pl.access.equals("followers"))
        fol.push(pl);
    }

    const all = {playlists: []};
    if (user.equals(sessionUser)) {
      all.playlists.concat(pub);
      all.playlists.concat(pri);
      all.playlists.concat(fol);
      return res.json(all);
    }

    if (me.follows.includes(user)) {
      all.playlists.concat(pub);
      all.playlists.concat(fol);
      return res.json(all);
    }

    all.playlists.concat(pub);
    res.json(all);
  } catch (error) {
    next(error);
  }
}

async function get_get_id(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const id = req.params.id;
  try {
    const me = await userCredentials.findById(sessionId);
    if (!me) throw new APIError();

    const record = playlists.findById(id);
    if (!record) throw new APIError({message: "Not found", status: 404});

    if (sessionUser.equals(record.user))
      return res.json(record);

    if (record.access.equals("private"))
      throw new APIError({message: "Unauthorized", status: 401});

    if (record.access.equals("followers")) {
      if (me.follows.includes(record.user)) {
        return res.json(record);
      }
    }

    res.json(record);
  } catch (error) {
    next(error);
  }
}

async function delete_delete(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const id = req.body.id;
  try {
    const me = await userCredentials.findById(sessionId);
    if (!me) throw new APIError();
  } catch (error) {
    next(error);
  }
}

async function post_add(req, res, next) {}

async function put_modify(req, res, next) {}

module.exports = {
  get: {
    show: get_show,
    showUser: get_show_user,
    showUserId: get_show_user_id,
    get: get_get,
    getUser: get_get_user,
    getId: get_get_id,
  },
  post: {
    add: post_add,
  },
  delete: {
    delete: delete_delete,
  },
  put: {
    modify: put_modify,
  },
};
