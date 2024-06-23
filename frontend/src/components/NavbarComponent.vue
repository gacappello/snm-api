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
            <v-container v-if="search.searchElements.length !== 0">
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
                    @click:close="elementClosed(selection, i)"
                  >
                    <v-icon size="x-small" start>{{ selection.icon }}</v-icon>
                    {{ selection.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
            <v-divider v-if="search.searchElements.length !== 0"></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-list class="d-flex flex-wrap justify-space-between">
                    <template v-for="item in search.possibleSearchElements">
                      <v-list-item
                        v-if="!search.searchElements.includes(item)"
                        :key="item.tag"
                        @click="elementOpened(item)"
                        style="flex: 0 0 50%"
                        class="rounded-lg text-center"
                        density="compact"
                        variant="plain"
                      >
                        <template v-slot:prepend>
                          <v-icon :icon="item.icon"></v-icon>
                        </template>
                        <v-list-item-title
                          class="text-grey-lighten-2"
                          v-text="item.name"
                        ></v-list-item-title>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
            <v-divider
              v-if="
                search.possibleSearchElements.length !==
                search.searchElements.length
              "
            ></v-divider>
            <v-sheet>
              <v-list v-if="search.response.users">
                <v-list-subheader>Users</v-list-subheader>
                <v-list-item
                  v-for="user in search.response.users"
                  :key="user"
                  :title="user"
                  class="px-12 text-grey-lighten-2 rounded-lg"
                  :href="'/profile/' + user"
                >
                  <template v-slot:prepend>
                    <v-avatar
                      size="small"
                      class="border-md border-ternary"
                      variant="text"
                    >
                      <v-img src="/user.jpg"></v-img>
                    </v-avatar>
                  </template>
                </v-list-item>
              </v-list>
              <div v-if="search.search">
                <v-list v-if="search.response.playlists">
                  <v-list-subheader>Playlists</v-list-subheader>
                  <v-list-item
                    v-for="playlist in search.response.playlists"
                    :key="playlist._id"
                    :title="playlist.name"
                    :subtitle="playlist.user"
                    class="px-12 text-grey-lighten-2 rounded-lg"
                    :href="'/playlists/' + playlist._id"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        size="small"
                        class="border-md border-ternary rounded-lg"
                        rounded="0"
                        variant="text"
                      >
                        <v-img src="/disc.png"></v-img>
                      </v-avatar>
                    </template>
                  </v-list-item>
                </v-list>
                <v-list v-if="search.response.tracks">
                  <v-list-subheader>Tracks</v-list-subheader>
                  <v-list-item
                    v-for="track in search.response.tracks"
                    :key="track.id"
                    :title="track.name"
                    :subtitle="track.album.name"
                    class="px-12 text-grey-lighten-2 rounded-lg"
                    :href="'/track/' + track.id"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        size="small"
                        class="border-sm rounded-lg"
                        rounded="0"
                        variant="text"
                      >
                        <v-img
                          lazy-src="/disc.png"
                          :src="
                            track.album.images[0]
                              ? track.album.images[0].url
                              : ''
                          "
                        ></v-img>
                      </v-avatar>
                    </template>
                  </v-list-item>
                </v-list>
                <v-list v-if="search.response.artists">
                  <v-list-subheader>Artists</v-list-subheader>
                  <v-list-item
                    v-for="artist in search.response.artists"
                    :key="artist.id"
                    :title="artist.name"
                    :subtitle="'Followers: ' + artist.followers.total"
                    class="px-12 text-grey-lighten-2 rounded-lg"
                    :href="'/artist/' + artist.id"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        size="small"
                        class="border-sm rounded-lg"
                        rounded="0"
                        variant="text"
                      >
                        <v-img
                          lazy-src="/disc.png"
                          :src="
                            artist.images
                              ? artist.images[0]
                                ? artist.images[0].url
                                : ''
                              : ''
                          "
                        ></v-img>
                      </v-avatar>
                    </template>
                  </v-list-item>
                </v-list>
              </div>

              <v-container v-else fluid>
                <v-row
                  class="text-center text-grey-lighten-2 pt-12 text-h4 font-weight-light"
                >
                  <v-col>
                    <span>Try Search Something</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
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
          { name: "Users", tag: "users", icon: "fa-solid fa-user" },
          { name: "Artists", tag: "artists", icon: "fa-solid fa-palette" },
          { name: "Playlists", tag: "playlists", icon: "fa-solid fa-list-ul" },
          { name: "Tracks", tag: "tracks", icon: "fa-solid fa-music" },
        ],
        searchElements: [],
        response: {},
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
    elementClosed(item, i) {
      this.search.searchElements.splice(i, 1);
      delete this.search.response[item.tag];
    },

    elementOpened(item) {
      this.search.searchElements.push(item);
      for (const attr in this.search.response) {
        if (attr !== item.tag) {
          delete this.search.response[attr];
        }
      }
    },

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

    async spotifySearch(data) {
      const search = await api.makeSearch(data);
      if (search.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = search.data.message;
      }
      return search.data;
    },

    async sendSearchRequest(value, params) {
      if (!value) return;

      let tags = [];
      if (!params.length) {
        tags = this.search.possibleSearchElements.map((a) => a.tag);
      } else tags = params.map((a) => a.tag);

      const response = {};
      if (tags.includes("users")) {
        const users = await this.getUsersData(value);
        response.users = users.users;
      }
      if (tags.includes("playlists")) {
        const playlists = await this.getPlaylistData(value);
        response.playlists = [];
        response.playlists.push(...playlists.myPlaylists);
        response.playlists.push(...playlists.friendsPlaylists);
        response.playlists.push(...playlists.othersPlaylists);
      }

      let doSearch = false;
      const types = [];
      if (tags.includes("tracks")) {
        types.push("track");
        response.tracks = [];
        doSearch = true;
      }

      if (tags.includes("artists")) {
        types.push("artist");
        response.artists = [];
        doSearch = true;
      }

      if (doSearch) {
        const data = { q: value, types: types, limit: 10 };
        const search = await this.spotifySearch(data);
        if (search.body.tracks)
          response.tracks.push(...search.body.tracks.items);
        if (search.body.artists)
          response.artists.push(...search.body.artists.items);
      }

      this.search.response = response;
    },
  },
};
</script>

<style></style>
