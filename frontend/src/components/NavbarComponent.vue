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
        icon="fa-solid fa-search"
        v-if="isAuth"
        @click="search.dialog = true"
      >
      </v-btn>
      <v-btn
        color="grey"
        append-icon="fa-solid fa-user"
        @click="
          $router.push('/profile/' + me.username).then(() => {
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
            $router.push('/profile/' + me.username).then(() => {
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
  <div class="pa-4 text-center">
    <v-dialog v-model="search.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg">
          <v-toolbar floating>
            <v-toolbar-title>Search in SNM!</v-toolbar-title>
          </v-toolbar>
          <v-text-field
            v-model="search.search"
            label="Search"
            append-inner-icon="fa-solid fa-search"
            density="compact"
            hide-details
            single-line
          ></v-text-field>
          <v-card-text style="height: 600px">
            <v-container>
              <v-row class="align-center justify-start">
                <v-col
                  v-for="(selection, i) in selections"
                  :key="selection.tag"
                  class="py-1 pe-0"
                  cols="auto"
                >
                  <v-chip
                    closable
                    size="large"
                    @click:close="search.searchElements.splice(i, 1)"
                  >
                    <v-icon size="x-small" start>{{ selection.icon }}</v-icon>
                    {{ selection.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-list>
              <template v-for="item in search.possibleSearchElements">
                <v-list-item
                  v-if="!search.searchElements.includes(item)"
                  :key="item.tag"
                  @click="search.searchElements.push(item)"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
            <v-divider></v-divider>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text="close" @click="search.dialog = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <v-snackbar v-model="errorSnackbar.show"
    >{{ errorSnackbar.message }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="errorSnackbar.show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import api from "../api";
import auth from "../auth";

export default {
  data() {
    return {
      me: null,
      errorSnackbar: {
        show: false,
        message: "",
      },
      search: {
        search: "",
        possibleSearchElements: [
          { name: "User", tag: "user", icon: "fa-solid fa-user" },
          { name: "Artist", tag: "artist", icon: "fa-solid fa-palette" },
          { name: "Playlist", tag: "playlist", icon: "fa-solid fa-list-ul" },
          { name: "Song", tag: "song", icon: "fa-solid fa-music" },
        ],
        searchElements: [],
        dialog: false,
      },
      isAuth: auth.isAuthenticated(),
      sideMenu: false,
    };
  },

  computed: {
    selections() {
      const selections = [];
      for (const selection of this.search.searchElements) {
        selections.push(selection);
      }
      return selections;
    },
  },

  watch: {
    "search.search"(newValue) {
      this.sendSearchRequest(newValue, this.search.searchElements);
    },
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

    async getUsersData(user) {
      const users = await api.getUsers({ params: { user: user } });
      if (users.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = users.data.message;
      }
      return users.data;
    },

    async getPlaylistData(name) {
      const playlists = await api.getPlaylists({ params: { name: name } });
      if (playlists.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = playlists.data.message;
      }
      return playlists.data;
    },

    async sendSearchRequest(value, params) {
      if (!params.length || !value) return;
      const response = {};
      for (let param of params) {
        if (param.tag === "user") {
          const users = await this.getUsersData(value);
          response.users = users.users;
        }
        if (param.tag === "playlist") {
          const playlists = await this.getPlaylistData(value);
          response.playlists = [];
          response.playlists.push(...playlists.myPlaylists);
          response.playlists.push(...playlists.friendsPlaylists);
          response.playlists.push(...playlists.othersPlaylists);
        }
        if (param.tag === "song") {
        }
        if (param.tag === "artist") {
        }
      }

      console.log(response);
    },
  },
};
</script>

<style></style>
