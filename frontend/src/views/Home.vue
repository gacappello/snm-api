<template>
  <v-container fluid class="mt-4 text-grey-lighten-2">
    <v-row dense>
      <v-col cols="12" class="text-center text-h4">
        <h1>S<span class="text-ternary">N</span>M Home</h1>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="mt-4 px-lg-10 text-grey-lighten-2">
    <v-row v-if="!data.loading && data.myPlaylists.length > 0">
      <v-col cols="12" class="px-lg-12">
        <h1 class="text-h4 font-weight-light">YOUR PLAYLISTS</h1>
      </v-col>
      <v-col cols="12">
        <ItemIteratorComponent
          :itemsToDisplay="data.myPlaylists"
          :itemKeyName="'_id'"
        >
          <template v-slot:default="{ item }">
            <v-row>
              <v-col>
                <PlaylistSheetComponent
                  :_id="item.raw._id"
                  :name="item.raw.name"
                  :access="item.raw.access"
                  :createdAt="item.raw.createdAt"
                  :src="item.raw.src"
                  :songs="item.raw.songs"
                />
              </v-col>
            </v-row>
          </template>
          <template v-slot:loading>
            <PlaylistSheetComponent :loading="true" />
          </template>
        </ItemIteratorComponent>
      </v-col>
    </v-row>
    <v-row v-if="!data.loading && data.friendsPlaylists.length > 0">
      <v-col cols="12" class="px-lg-12">
        <h1 class="text-h4 font-weight-light">FOLLOWS PLAYLISTS</h1>
      </v-col>
      <v-col cols="12">
        <ItemIteratorComponent
          :itemsToDisplay="data.friendsPlaylists"
          :itemKeyName="'_id'"
        >
          <template v-slot:default="{ item }">
            <v-row>
              <v-col>
                <PlaylistSheetComponent
                  :_id="item.raw._id"
                  :name="item.raw.name"
                  :access="item.raw.access"
                  :createdAt="item.raw.createdAt"
                  :src="item.raw.src"
                  :songs="item.raw.songs"
                />
              </v-col>
            </v-row>
          </template>
          <template v-slot:loading>
            <PlaylistSheetComponent :loading="true" />
          </template>
        </ItemIteratorComponent>
      </v-col>
    </v-row>
    <v-row v-if="!data.loading && data.othersPlaylists.length > 0">
      <v-col cols="12" class="px-lg-12">
        <h1 class="text-h4 font-weight-light">OTHER PLAYLISTS</h1>
      </v-col>
      <v-col cols="12">
        <ItemIteratorComponent
          :itemsToDisplay="data.othersPlaylists"
          :itemKeyName="'_id'"
        >
          <template v-slot:default="{ item }">
            <v-row>
              <v-col>
                <PlaylistSheetComponent
                  :_id="item.raw._id"
                  :name="item.raw.name"
                  :access="item.raw.access"
                  :createdAt="item.raw.createdAt"
                  :src="item.raw.src"
                  :songs="item.raw.songs"
                />
              </v-col>
            </v-row>
          </template>
          <template v-slot:loading>
            <PlaylistSheetComponent :loading="true" />
          </template>
        </ItemIteratorComponent>
      </v-col>
    </v-row>
    <v-row v-if="!data.loading && data.favouritesPlaylists.length > 0">
      <v-col cols="12" class="px-lg-12">
        <h1 class="text-h4 font-weight-light">FAVOURITES PLAYLISTS</h1>
      </v-col>
      <v-col cols="12">
        <ItemIteratorComponent
          :itemsToDisplay="data.favouritesPlaylists"
          :itemKeyName="'_id'"
        >
          <template v-slot:default="{ item }">
            <v-row>
              <v-col>
                <PlaylistSheetComponent
                  :_id="item.raw._id"
                  :name="item.raw.name"
                  :access="item.raw.access"
                  :createdAt="item.raw.createdAt"
                  :src="item.raw.src"
                  :songs="item.raw.songs"
                />
              </v-col>
            </v-row>
          </template>
          <template v-slot:loading>
            <PlaylistSheetComponent :loading="true" />
          </template>
        </ItemIteratorComponent>
      </v-col>
    </v-row>
    <v-row v-if="!data.loading">
      <v-col cols="12" class="px-lg-12">
        <h1 class="text-h4 font-weight-light">RECOMMENDED TRACKS</h1>
      </v-col>
      <v-col
        cols="12"
        v-if="recommendationsAvaliable && !loadingRecommendation"
      >
        <ItemIteratorComponent
          :itemsToDisplay="data.recommended"
          :itemKeyName="'id'"
        >
          <template v-slot:default="{ item }">
            <v-row>
              <v-col>
                <TrackSheetComponent :_id="item.raw.id" />
              </v-col>
            </v-row>
          </template>
        </ItemIteratorComponent>
      </v-col>
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-btn
          color="ternary"
          :loading="loadingRecommendation"
          @click="refreshPressed()"
          >Refresh</v-btn
        >
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
import PlaylistSheetComponent from "../components/PlaylistSheetComponent.vue";
import TrackSheetComponent from "../components/TrackSheetComponent.vue";

export default {
  components: {
    ItemIteratorComponent,
    PlaylistSheetComponent,
    TrackSheetComponent,
  },
  data() {
    return {
      me: null,
      recommendationsAvaliable: true,
      loadingRecommendation: true,
      data: {
        myPlaylists: [],
        friendsPlaylists: [],
        othersPlaylists: [],
        favouritesPlaylists: [],
        recommended: [],
        loading: true,
      },
      errorSnackbar: {
        show: false,
        message: "",
      },
    };
  },

  async beforeMount() {
    const playlists = await api.getPlaylists();
    if (playlists.data.error) {
      this.errorSnackbar.show = true;
      this.errorSnackbar.message = playlists.data.message;
      return;
    }

    this.data.myPlaylists = playlists.data.myPlaylists;
    this.data.friendsPlaylists = playlists.data.friendsPlaylists;
    this.data.othersPlaylists = playlists.data.othersPlaylists;

    const me = await api.getMe();
    if (me.data.error) {
      this.errorSnackbar.show = true;
      this.errorSnackbar.message = me.data.message;
      return;
    }

    this.me = me.data.user;
    this.data.favouritesPlaylists = this.me.favourites;
    await this.getRecommendations();
    this.data.loading = false;
  },

  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },

    async refreshPressed() {
      this.loadingRecommendation = true;
      await this.getRecommendations();
      this.loadingRecommendation = false;
    },

    async getRecommendations() {
      const options = {
        limit: 36,
      };

      const seed_genres = [];
      seed_genres.push(...this.me.genres);
      seed_genres.length = Math.min(seed_genres.length, 5);

      const seed_tracks = [];
      for (let p of this.data.myPlaylists) {
        if (p.songs.length > 0) seed_tracks.push(p.songs[0]);
      }
      seed_tracks.length = Math.min(seed_tracks.length, 5);

      const possible = [
        { name: "seed_genres", value: seed_genres },
        { name: "seed_tracks", value: seed_tracks },
      ];

      if (!seed_genres.length && seed_tracks.length) {
        this.recommendationsAvaliable = false;
        return;
      }

      let ok = false;
      while (!ok) {
        const random = this.getRandomInt(2);
        if (possible[random].value.length) {
          options[possible[random].name] = possible[random].value;
          ok = true;
        }
      }

      const recommendations = await api.getRecommendations(options);
      if (recommendations.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = recommendations.data.message;
        return;
      }

      this.data.recommended = recommendations.data.body.tracks;
      this.loadingRecommendation = false;
    },
  },
};
</script>
