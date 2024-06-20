import Cookies from "js-cookie";

function makeLogout() {
  Cookies.remove("connect.sid");
}

function isAuthenticated() {
  const c = !!Cookies.get("connect.sid");
  return c;
}

export default {
  makeLogout,
  isAuthenticated,
};
