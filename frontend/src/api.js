import instance from "./axios";

async function getUserProfile(username) {
  try {
    return await instance.get("/users/get/" + username);
  } catch (error) {
    return error.response;
  }
}

async function followUser(username) {
  try {
    return await instance.post("/users/follow/" + username);
  } catch (error) {
    return error.response;
  }
}

async function unfollowUser(username) {
  try {
    return await instance.post("/users/unfollow/" + username);
  } catch (error) {
    return error.response;
  }
}

async function updateUser(data) {
  try {
    return await instance.put("/users/update", data);
  } catch (error) {
    return error.response;
  }
}

async function login(data) {
  try {
    return await instance.post("/login", data);
  } catch (error) {
    return error.response;
  }
}

async function register(data) {
  try {
    return await instance.post("/register", data);
  } catch (error) {
    return error.response;
  }
}

async function logout(data) {
  try {
    return await instance.post("/logout", data);
  } catch (error) {
    return error.response;
  }
}

async function getPlaylists() {
  try {
    return await instance.get("/playlists/get");
  } catch (error) {
    return error.response;
  }
}

async function getPlaylistsOfUser(username) {
  try {
    return await instance.get("/playlists/get/user/" + username);
  } catch (error) {
    return error.response;
  }
}

async function getPlaylist(id) {
  try {
    return await instance.get("/playlists/get/" + id);
  } catch (error) {
    return error.response;
  }
}

async function deletePlaylist(id) {
  try {
    return await instance.delete("/playlists/delete/" + id);
  } catch (error) {
    return error.response;
  }
}

async function addPlaylist(data) {
  try {
    return await instance.post("/playlists/add", data);
  } catch (error) {
    return error.response;
  }
}

async function modifyPlaylist(id, data) {
  try {
    return await instance.post("/playlists/modify/" + id, data);
  } catch (error) {
    return error.response;
  }
}

async function likePlaylist(id) {
  try {
    return await instance.post("/playlists/like/" + id);
  } catch (error) {
    return error.response;
  }
}

async function dislikePlaylist(id) {
  try {
    return await instance.post("/playlists/dislike/" + id);
  } catch (error) {
    return error.response;
  }
}

async function insertSong(id, data) {
  try {
    return await instance.put("/playlists/insert/song/" + id, data);
  } catch (error) {
    return error.response;
  }
}

async function removeSong(id, data) {
  try {
    return await instance.put("/playlists/remove/song/" + id, data);
  } catch (error) {
    return error.response;
  }
}

async function insertTag(id, data) {
  try {
    return await instance.put("/playlists/insert/tag/" + id, data);
  } catch (error) {
    return error.response;
  }
}

async function removeTag(id, data) {
  try {
    return await instance.put("/playlists/remove/tag/" + id, data);
  } catch (error) {
    return error.response;
  }
}

async function getAlbums(data) {
  try {
    return await instance.post("/sapi/albums", data);
  } catch (error) {
    return error.response;
  }
}

async function getAlbum(id, data) {
  try {
    return await instance.post("/sapi/albums/" + id, data);
  } catch (error) {
    return error.response;
  }
}

async function getAlbumTracks(id, data) {
  try {
    return await instance.post("/sapi/albums/" + id + "/tracks", data);
  } catch (error) {
    return error.response;
  }
}

async function getArtists(data) {
  try {
    return await instance.post("/sapi/artists", data);
  } catch (error) {
    return error.response;
  }
}

async function getArtist(id) {
  try {
    return await instance.get("/sapi/artists/" + id);
  } catch (error) {
    return error.response;
  }
}

async function getArtistAlbums(id, data) {
  try {
    return await instance.post("/sapi/artists/" + id + "/albums", data);
  } catch (error) {
    return error.response;
  }
}

async function getArtistTopTracks(id, data) {
  try {
    return await instance.post("/sapi/artists/" + id + "/top-tracks", data);
  } catch (error) {
    return error.response;
  }
}

async function getArtistRelatedArtists(id) {
  try {
    return await instance.get("/sapi/artists/" + id + "/top-tracks");
  } catch (error) {
    return error.response;
  }
}

async function getTracks(data) {
  try {
    return await instance.post("/sapi/tracks", data);
  } catch (error) {
    return error.response;
  }
}

async function getTrack(id, data) {
  try {
    return await instance.post("/sapi/tracks/" + id, data);
  } catch (error) {
    return error.response;
  }
}

async function getRecommendations(data) {
  try {
    return await instance.post("/sapi/recommendations", data);
  } catch (error) {
    return error.response;
  }
}

async function getRecommendationsGenres() {
  try {
    return await instance.get("/sapi/recommendations/available-genre-seeds");
  } catch (error) {
    return error.response;
  }
}

export default {
  getUserProfile: getUserProfile,
  followUser: followUser,
  unfollowUser: unfollowUser,
  updateUser: updateUser,

  login: login,
  logout: logout,
  register: register,

  getPlaylists: getPlaylists,
  getPlaylistsOfUser: getPlaylistsOfUser,
  getPlaylist: getPlaylist,
  deletePlaylist: deletePlaylist,
  addPlaylist: addPlaylist,
  modifyPlaylist: modifyPlaylist,
  likePlaylist: likePlaylist,
  dislikePlaylist: dislikePlaylist,
  insertSong: insertSong,
  removeSong: removeSong,
  insertTag: insertTag,
  removeTag: removeTag,

  getAlbums: getAlbums,
  getAlbum: getAlbum,
  getAlbumTracks: getAlbumTracks,

  getArtists: getArtists,
  getArtist: getArtist,
  getArtistAlbums: getArtistAlbums,
  getArtistTopTracks: getArtistTopTracks,
  getArtistRelatedArtists: getArtistRelatedArtists,

  getTracks: getTracks,
  getTrack: getTrack,

  getRecommendations: getRecommendations,
  getRecommendationsGenres: getRecommendationsGenres,
};
