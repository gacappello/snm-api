const { Types } = require("mongoose");
const playlists = require("../database/models/playlists");
const userCredentials = require("../database/models/userCredentials");
const { APIError } = require("../utils/api-error");
const spotifyApi = require("../spotify");

async function get_get(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  let { name } = req.query;

  try {
    const me = await userCredentials.findById(sessionId);
    if (!me) throw new APIError();

    if (!name) name = "";

    const all = {
      myPlaylists: [],
      friendsPlaylists: [],
      othersPlaylists: [],
    };

    const myPlaylists = await playlists.find({
      user: sessionUser,
      name: { $regex: "^" + name },
    });
    for (pl of myPlaylists) {
      all.myPlaylists.push(pl);
    }

    for (let follow of me.follows) {
      const record = await playlists
        .find({
          user: follow,
          name: { $regex: "^" + name },
        })
        .where("access")
        .ne("private")
        .exec();
      for (pl of record) {
        all.friendsPlaylists.push(pl);
      }
    }

    const othersPlaylists = await playlists
      .find({ name: { $regex: "^" + name } })
      .where("user")
      .ne(sessionUser)
      .where("access")
      .equals("public")
      .exec();

    for (let pl of othersPlaylists) {
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
  let { user } = req.params;
  user = user.toLowerCase();

  try {
    const me = await userCredentials.findById(sessionId);
    if (!me) throw new APIError();

    const record = await playlists.find({ user: user });
    if (!record)
      throw new APIError({ message: "Username is unknown", status: 404 });

    const pub = [];
    const pri = [];
    const fol = [];

    for (pl of record) {
      if (pl.access === "public") pub.push(pl);
      if (pl.access === "private") pri.push(pl);
      if (pl.access === "followers") fol.push(pl);
    }

    const all = { playlists: [] };
    if (user === sessionUser) {
      all.playlists.push(...pub);
      all.playlists.push(...pri);
      all.playlists.push(...fol);
      return res.json(all);
    }

    if (me.follows.includes(user)) {
      all.playlists.push(...pub);
      all.playlists.push(...fol);
      return res.json(all);
    }

    all.playlists.push(...pub);
    res.json(all);
  } catch (error) {
    next(error);
  }
}

async function get_get_id(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const { id } = req.params;

  try {
    const me = await userCredentials.findById(sessionId);
    if (!me) throw new APIError();

    const record = await playlists.findById(id);
    if (!record)
      throw new APIError({ message: "Playlist not found", status: 404 });

    if (sessionUser === record.user) return res.json(record);

    if (record.access === "private")
      throw new APIError({
        message: "You are unauthorized for this playlist",
        status: 403,
      });

    if (record.access === "followers") {
      if (me.follows.includes(record.user)) {
        return res.json(record);
      }
    }

    res.json(record);
  } catch (error) {
    next(error);
  }
}

async function delete_delete_id(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const { id } = req.params;
  try {
    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    const record = await playlists.findOneAndDelete({
      _id: id,
      user: sessionUser,
    });
    if (!record)
      throw new APIError({
        message: "Playlist not found for " + sessionUser,
        status: 404,
      });

    res.json(record);
  } catch (error) {
    next(error);
  }
}

async function post_add(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const { name, description, tags, access, src } = req.body;
  try {
    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    const playlist = {
      user: sessionUser,
      name: name,
      description: description || `A playlist from ${sessionUser}`,
      tags: tags || [],
      access: access,
      src: src,
    };

    const doc = new playlists(playlist);
    await doc.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function put_modify_id(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const { name, description, tags, songs, access, src } = req.body;
  const { id } = req.params;

  const update = {};
  if (name) update.name = name;
  if (description) update.description = description;
  if (tags) update.tags = tags;
  if (songs) update.songs = songs;
  if (access) update.access = access;
  if (src) update.src = src;

  try {
    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    const record = await playlists.findOneAndUpdate(
      { _id: id, user: sessionUser },
      update,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!record)
      throw new APIError({
        message: "Playlist not found for " + sessionUser,
        status: 404,
      });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function post_like_id(req, res, next) {
  const sessionId = req.session.userId;
  const { id } = req.params;
  try {
    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    const playlistExists = await playlists.exists({ _id: id });
    if (!playlistExists)
      throw new APIError({
        message: "Playlist not found",
        status: 404,
      });

    const oid = new Types.ObjectId(id);
    await userCredentials.findByIdAndUpdate(sessionId, {
      $addToSet: { favourites: oid },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function post_dislike_id(req, res, next) {
  const sessionId = req.session.userId;
  const { id } = req.params;
  try {
    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    const oid = new Types.ObjectId(id);
    await userCredentials.findByIdAndUpdate(sessionId, {
      $pull: { favourites: oid },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function put_insert_song_id(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const { id } = req.params;
  const { songId } = req.body;
  try {
    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    let track = {};
    await spotifyApi
      .getTrack(songId)
      .then(
        function (data) {
          track = data;
        },
        function (err) {
          throw new APIError({
            message: err.message,
            status: err.status,
          });
        }
      )
      .catch(function (err) {
        next(err);
      });

    let src = undefined;
    if (track.body.album && track.body.album.images[0]) {
      src = track.body.album.images[0].url;
    }

    let record = await playlists.findById(id);
    if (!record) {
      throw new APIError({
        message: "Playlist not found for " + sessionUser,
        status: 404,
      });
    }

    if (!record.src) {
      record.src = src;
      await record.save();
    }

    record = await playlists.findOneAndUpdate(
      { _id: id, user: sessionUser },
      { $push: { songs: songId } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function put_remove_song_id(req, res, next) {
  const sessionId = req.session.userId;
  const sessionUser = req.session.user;
  const { id } = req.params;
  const { position } = req.body;

  try {
    if (typeof position !== "number" || position < 0)
      throw new APIError({ message: "Invalid position", status: 400 });

    const iExists = await userCredentials.exists({ _id: sessionId });
    if (!iExists) throw new APIError();

    const playlist = await playlists.findOne({
      _id: id,
      user: sessionUser,
    });
    if (!playlist)
      throw new APIError({
        message: "Playlist not found for " + sessionUser,
        status: 404,
      });

    if (position >= playlist.songs.length)
      throw new APIError({ message: "Invalid position: ", status: 400 });

    playlist.songs.splice(position, 1);
    if (!playlist.songs.length) playlist.src = undefined;
    await playlist.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get: {
    get: get_get,
    getUser: get_get_user,
    getId: get_get_id,
  },
  post: {
    add: post_add,
    likeId: post_like_id,
    dislikeId: post_dislike_id,
  },
  delete: {
    deleteId: delete_delete_id,
  },
  put: {
    modifyId: put_modify_id,
    insertSongId: put_insert_song_id,
    removeSongId: put_remove_song_id,
  },
};
