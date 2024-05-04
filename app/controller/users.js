async function get_show(req, res) {

}

async function get_show_user(req, res) {

}

async function get_get_user(req, res) {

}

async function post_follow_user(req, res) {

}

async function post_unfollow_user(req, res) {

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
  }
}
