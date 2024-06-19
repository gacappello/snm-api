import Cookies from "js-cookie";

function makeLogout() {
  Cookies.remove("connect.sid");
  Cookies.remove("user");
}

function isAuthenticated() {
  const c = !!Cookies.get("connect.sid") && !!Cookies.get("user");
  return c;
}

export default {
  makeLogout,
  isAuthenticated,
};
