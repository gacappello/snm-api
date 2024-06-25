<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-card
          class="border-md rounded-xl d-flex justify-center"
          color="transparent"
          max-width="300px"
          max-height="300px"
          elevation="24"
          :href="artistLink"
        >
          <v-img
            lazy-src="/disc.png"
            aspect-ratio="1"
            class="rounded-xl"
            min-width="350px"
            min-height="350px"
            cover
            :src="artistImage"
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
      <v-col v-if="!artist.loading" cols="12" class="d-flex justify-center">
        <h1 class="font-weight-black">
          {{ artist.data.name }}
        </h1>
      </v-col>
    </v-row>
    <v-row v-if="!artist.loading">
      <v-col cols="12" class="px-lg-12">
        <h1 class="text-h4 font-weight-light">TOP TRACKS</h1>
      </v-col>
      <v-col cols="12">
        <ItemIteratorComponent :itemsToDisplay="topTracks" :itemKeyName="'id'">
          <template v-slot:default="{ item }">
            <v-row>
              <v-col>
                <TrackSheetComponent
                  :_id="item.raw.id"
                  :make-request="false"
                  :name="item.raw.name"
                  :artist-name="
                    item.raw.artists
                      ? item.raw.artists[0]
                        ? item.raw.artists[0].name
                        : ''
                      : ''
                  "
                  :explicit="item.raw.explicit"
                  :duration-ms="item.raw.duration_ms"
                  :album-name="item.raw.album ? item.raw.album.name : ''"
                  :src="
                    item.raw.album
                      ? item.raw.album.images
                        ? item.raw.album.images[0]
                          ? item.raw.album.images[0].url
                          : ''
                        : ''
                      : ''
                  "
                />
              </v-col>
            </v-row>
          </template>
        </ItemIteratorComponent>
      </v-col>
    </v-row>
  </v-container>
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

import ItemIteratorComponent from "../components/ItemIteratorComponent.vue";
import TrackSheetComponent from "../components/TrackSheetComponent.vue";

export default {
  emits: ["changeBackground"],

  components: {
    ItemIteratorComponent,
    TrackSheetComponent,
  },

  data() {
    return {
      me: null,
      artist: {
        id: this.$route.params.id,
        loading: true,
        data: null,
      },
      topTracks: [],
      errorSnackbar: {
        show: false,
        message: "",
      },
    };
  },

  computed: {
    artistLink() {
      return !this.artist.loading ? this.artist.data.external_urls.spotify : "";
    },
    artistImage() {
      return !this.artist.loading
        ? this.artist.data.images
          ? this.artist.data.images[0]
            ? this.artist.data.images[0].url
            : ""
          : ""
        : "";
    },
    artistFollowers() {
      return !this.artist.loading
        ? this.artist.followers
          ? this.artist.followers.total
            ? 0
            : 0
          : 0
        : 0;
    },
  },

  async beforeMount() {
    const artist = await api.getArtist(this.artist.id);
    if (artist.data.error) {
      this.errorSnackbar.show = true;
      this.errorSnackbar.message = artist.data.message;
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

    this.me = me.data.user;
    this.artist.data = artist.data.body;
    this.artist.loading = false;
    if (this.artist.data.images && this.artist.data.images[0]) {
      this.$emit("changeBackground", this.artist.data.images[0].url);
    }

    await this.getTopTracks();
  },

  methods: {
    async getTopTracks() {
      const response = await api.getArtistTopTracks(this.artist.id);
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
        return;
      }

      this.topTracks = response.data.body.tracks;
    },
  },

  beforeRouteLeave(to, from, next) {
    if (from.name === "artist") this.$emit("changeBackground");
    next();
  },
};
</script>
<style>
iframe {
  border-radius: 30px;
}
</style>
