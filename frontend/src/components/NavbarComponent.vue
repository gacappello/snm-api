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
        @click="
          $router.push('/home').then(() => {
            this.$router.go(0);
          })
        "
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
        @click="
          $router.push('/login').then(() => {
            this.$router.go(0);
          })
        "
        v-if="!isAuth"
        class="hidden-xs"
      >
        Login
      </v-btn>
      <v-btn
        color="grey"
        append-icon="fa-solid fa-user"
        @click="
          $router.push('/profile/' + loggedUsername).then(() => {
            this.$router.go(0);
          })
        "
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
          @click="
            $router.push('/profile/' + loggedUsername).then(() => {
              this.$router.go(0);
            })
          "
          v-if="isAuth"
        >
        </v-list-item>
        <v-list-item
          density="comfortable"
          prepend-icon="fa-solid fa-home"
          title="Home"
          value="home"
          @click="
            $router.push('/home').then(() => {
              this.$router.go(0);
            })
          "
        ></v-list-item>
        <v-list-item
          density="comfortable"
          prepend-icon="fa-solid fa-music"
          title="Playlists"
          value="playlists"
          @click="
            $router.push('/playlists').then(() => {
              this.$router.go(0);
            })
          "
        ></v-list-item>
        <v-list-item
          density="comfortable"
          prepend-icon="fa-solid fa-right-to-bracket"
          title="Login"
          value="login"
          class="hidden-sm-and-up"
          @click="
            $router.push('/login').then(() => {
              this.$router.go(0);
            })
          "
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
import auth from "../auth";

export default {
  data() {
    return {
      loggedUsername: this.$cookies.get("user"),
      isAuth: auth.isAuthenticated(),
      sideMenu: false,
    };
  },
  methods: {
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
