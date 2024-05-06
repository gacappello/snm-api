const playlists = require("../database/models/playlists");
const userCredentials = require("../database/models/userCredentials");

async function get_show(req, res, next) {}

async function get_show_user(req, res, next) {}

async function get_show_user_id(req, res, next) {}

async function get_get(req, res, next) {
  const sessionId = req.session.userId;
  try {
    const me = await userCredentials.findById(sessionId);
    if(!me) throw new APIError();

    const followsPlaylists = {};
    for(follow of me.follows){
      const record = await playlists
    }

    const myPlaylists = await playlists.find({ user: sessionId });
    const othersPlaylists = await playlists
      .find({})
      .where("user")
      .ne(sessionId)
      .and("access")
      .equals("public")
      .exec();
  } catch (error) {
    next(error);
  }
}

async function get_get_user(req, res, next) {}

async function get_get_user_id(req, res, next) {}

async function delete_delete(req, res, next) {}

async function post_add(req, res, next) {}

async function put_modify(req, res, next) {}

module.exports = {
  get: {
    show: get_show,
    showUser: get_show_user,
    showUserId: get_show_user_id,
    get: get_get,
    getUser: get_get_user,
    getUserId: get_get_user_id,
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
