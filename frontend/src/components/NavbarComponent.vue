<template>
  <nav>
    <v-app-bar
      app
      elevation="20"
      density="comfortable"
      color="secondary"
      class="border-b-sm"
    >
      <v-app-bar-nav-icon
        class="bg-grey-lighten-1"
        @click="sideMenu = !sideMenu"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        class="text-grey-lighten-1 cursor-pointer"
        @click="$router.push('/home')"
      >
        <span class="font-weight-bold">SNM </span>
        <span class="font-italic">
          - Social Network for Music
          <v-icon right size="x-small">fa-solid fa-music</v-icon>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="grey"
        append-icon="fa-solid fa-right-to-bracket"
        @click="$router.push('/login')"
        v-if="!isAuth"
        class="hidden-xs"
      >
        Login
      </v-btn>
      <v-btn
        color="grey"
        append-icon="fa-solid fa-user"
        @click="$router.push('/profile/' + me.username)"
        v-if="isAuth"
        class="hidden-xs"
      >
        Profile
      </v-btn>
      <v-btn
        color="grey"
        append-icon="fa-solid fa-right-from-bracket"
        v-if="isAuth"
        class="hidden-xs"
        @click="logoutPressed()"
      >
        Logout
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="sideMenu" temporary>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="fa-solid fa-user"
          title="Profile"
          value="profile"
          @click="$router.push('/profile/' + me.username)"
          v-if="isAuth"
        >
        </v-list-item>
        <v-list-item
          density="comfortable"
          prepend-icon="fa-solid fa-home"
          title="Home"
          value="home"
          @click="$router.push('/home')"
        ></v-list-item>
        <v-list-item
          density="comfortable"
          prepend-icon="fa-solid fa-music"
          title="Playlists"
          value="playlists"
          @click="$router.push('/playlists')"
        ></v-list-item>
        <v-list-item
          density="comfortable"
          prepend-icon="fa-solid fa-right-to-bracket"
          title="Login"
          value="login"
          class="hidden-sm-and-up"
          @click="$router.push('/login')"
          v-if="!isAuth"
        ></v-list-item>
        <v-list-item
          density="comfortable"
          prepend-icon="fa-solid fa-right-from-bracket"
          title="Logout"
          value="logout"
          class="hidden-sm-and-up"
          @click="logoutPressed()"
          v-if="isAuth"
        ></v-list-item> </v-list
    ></v-navigation-drawer>
  </nav>
</template>
<script>
import api from "../api";
import auth from "../auth";

export default {
  data() {
    return {
      me: null,
      isAuth: auth.isAuthenticated(),
      sideMenu: false,
    };
  },

  async beforeMount() {
    if (this.isAuth) {
      const me = await this.sendGetMeRequest();
      if (!me.data.error) {
        this.me = me.data.user;
      }
    }
  },

  methods: {
    async sendGetMeRequest() {
      return await api.getMe();
    },

    logoutPressed() {
      auth.makeLogout();
      this.$router.push("/login").then(() => {
        this.$router.go(0);
      });
    },
  },
};
</script>
<style></style>
