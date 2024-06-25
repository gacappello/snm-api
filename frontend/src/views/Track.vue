<template>
  <v-container>
    <v-row>
      <v-col class="hidden-md-and-down" cols="4">
        <v-row>
          <v-col cols="12" class="d-flex justify-center align-center">
            <v-card
              class="border-md rounded-xl d-flex justify-center"
              color="transparent"
              max-width="400px"
              max-height="400px"
              elevation="24"
              :href="
                !this.track.loading
                  ? this.track.data.album.external_urls.spotify
                  : ''
              "
            >
              <v-img
                lazy-src="/disc.png"
                aspect-ratio="1"
                class="rounded-xl"
                min-width="350px"
                min-height="350px"
                cover
                :src="
                  !this.track.loading ? this.track.data.album.images[0].url : ''
                "
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="8">
        <v-sheet
          class="border rounded-xl fill-height d-flex align-center"
          color="transparent"
          elevation="24"
        >
          <div id="embed-iframe"></div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="mt-4 mt-md-12" v-if="!this.track.loading">
    <v-row>
      <v-col>
        <v-row>
          <v-col class="text-h5 text-grey-lighten-4 d-flex justify-center">
            <v-card
              color="transparent"
              elevation="24"
              class="rounded-xl pa-4 pa-md-10"
              v-ripple
            >
              <v-card-title>
                <h1 class="font-weight-black">{{ this.track.data.name }}</h1>
              </v-card-title>
              <v-card-subtitle>
                {{ this.track.data.album.name }}
              </v-card-subtitle>
              <v-divider></v-divider>

              <v-card-text>
                <v-container>
                  <v-row dense class="ga-0">
                    <v-col cols="6">
                      <v-card
                        v-ripple
                        class="rounded font-weight-light"
                        elevation="0"
                        link
                        prepend-icon="fa-solid fa-user"
                        color="transparent"
                        :title="
                          this.track.data.artists
                            ? this.track.data.artists[0]
                              ? this.track.data.artists[0].name
                              : ''
                            : ''
                        "
                      >
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card
                        v-ripple
                        link
                        class="rounded font-weight-light text-right"
                        elevation="0"
                        :append-icon="
                          this.track.data.explicit
                            ? 'fa-solid fa-x'
                            : 'fa-solid fa-check'
                        "
                        color="transparent"
                        :title="this.track.data.explicit ? 'Explicit' : 'Safe'"
                      >
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card
                        v-ripple
                        link
                        class="rounded font-weight-light"
                        elevation="0"
                        prepend-icon="fa-solid fa-clock"
                        color="transparent"
                        :title="
                          millisToMinutesAndSeconds(this.track.data.duration_ms)
                        "
                      >
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card
                        v-ripple
                        link
                        class="rounded font-weight-light text-right"
                        elevation="0"
                        append-icon="fa-solid fa-list"
                        color="transparent"
                        :title="this.track.data.album.name"
                      >
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn @click="add.dialog = true"> Add to playlist! </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <div class="pa-4 text-center">
    <v-dialog v-model="add.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg">
          <v-toolbar floating>
            <v-toolbar-title>Add to playlist</v-toolbar-title>
          </v-toolbar>
          <v-text-field
            v-model="add.search"
            label="Search for a playlist"
            append-inner-icon="fa-solid fa-search"
            density="compact"
            hide-details
            single-line
          ></v-text-field>
          <v-card-text class="px-4" style="height: 500px">
            <v-list v-if="myPlaylists.length !== 0">
              <v-list-item
                v-for="playlist in filteredPlaylists"
                :key="playlist._id"
                :title="playlist.name"
                :subtitle="playlist.description"
                class="text-grey-lighten-2 rounded-lg"
                link
                @click="playlistClicked(playlist._id)"
              >
                <template v-slot:prepend>
                  <v-avatar
                    size="x-large"
                    class="border-md border-ternary rounded-lg"
                    rounded="0"
                    variant="text"
                  >
                    <v-img lazy-src="/disc.png" :src="playlist.src"></v-img>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text="close" @click="add.dialog = false"></v-btn>
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

export default {
  emits: ["changeBackground"],

  data() {
    return {
      me: null,
      track: {
        id: this.$route.params.id,
        loading: true,
        data: null,
      },
      add: {
        search: "",
        dialog: false,
      },
      myPlaylists: [],
      errorSnackbar: {
        show: false,
        message: "",
      },
    };
  },

  computed: {
    filteredPlaylists() {
      const searchLower = this.add.search.toLowerCase();
      return this.myPlaylists.filter((playlist) => {
        return playlist.name.toLowerCase().includes(searchLower);
      });
    },
  },

  async beforeMount() {
    const track = await api.getTrack(this.track.id);
    if (track.data.error) {
      this.errorSnackbar.show = true;
      this.errorSnackbar.message = track.data.message;
      return;
    }

    const me = await api.getMe();
    if (me.data.error) {
      this.errorSnackbar.show = true;
      this.errorSnackbar.message = me.data.message;
      return;
    }

    const playlists = await api.getPlaylistsOfUser(me.data.user.username);
    if (playlists.data.error) {
      this.errorSnackbar.show = true;
      this.errorSnackbar.message = playlists.data.message;
      return;
    }

    this.myPlaylists = playlists.data.playlists;
    this.me = me.data.user;
    this.track.data = track.data.body;
    this.track.loading = false;
    if (this.track.data.album && this.track.data.album.images[0]) {
      this.$emit("changeBackground", this.track.data.album.images[0].url);
    }
  },

  mounted() {
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.head.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById("embed-iframe");
      const options = {
        width: "100%",
        uri: "spotify:track:" + this.track.id,
      };
      const callback = (EmbedController) => {};
      IFrameAPI.createController(element, options, callback);
    };
  },

  methods: {
    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },

    async playlistClicked(id) {
      const response = await api.insertSong(id, { songId: this.track.id });
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
        return;
      }
      this.add.dialog = false;
    },
  },

  beforeRouteLeave(to, from, next) {
    if (from.name === "track") this.$emit("changeBackground");
    next();
  },
};
</script>
<style>
iframe {
  border-radius: 30px;
}
</style>
