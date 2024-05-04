async function get_show(req, res) {

}

async function get_show_user(req, res) {

}

async function get_show_user_id(req, res) {

}

async function get_get(req, res) {

}

async function get_get_user(req, res) {

}

async function get_get_user_id(req, res) {

}

async function delete_delete(req, res) {

}

async function post_add(req, res) {

}

async function put_modify(req, res) {

}

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
  }
}
