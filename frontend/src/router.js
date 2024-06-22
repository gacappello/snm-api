import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";

import Default from "./views/Default.vue";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Playlist from "./views/Playlist.vue";
import Artist from "./views/Artist.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { authOnly: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { authOnly: true },
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { requireAuth: true },
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: Profile,
    meta: { requireAuth: true },
  },
  {
    path: "/playlist/:id",
    name: "playlist",
    component: Playlist,
    meta: { requireAuth: true },
  },
  {
    path: "/artist/:id",
    name: "artist",
    component: Artist,
    meta: { requireAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "default",
    component: Default,
  },
];

const router = createRouter({
  history: createWebHistory(), // Attiva navigazione avanti e indietro
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = auth.isAuthenticated();
  if (to.matched.some((record) => record.meta.requireAuth) && !isAuth) {
    next("/login");
  } else if (to.matched.some((record) => record.meta.authOnly) && isAuth) {
    next("/home");
  } else {
    next();
  }
});

export default router;
