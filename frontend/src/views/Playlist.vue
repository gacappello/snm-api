<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4">
        <v-row>
          <v-col cols="12" class="d-flex justify-center align-center">
            <v-card
              class="border-md rounded-xl d-flex justify-center"
              color="transparent"
              max-width="400px"
              max-height="400px"
              elevation="24"
              :href="
                !playlist.loading
                  ? playlist.data.src
                    ? playlist.data.src
                    : ''
                  : ''
              "
              link
            >
              <v-img
                lazy-src="/disc.png"
                aspect-ratio="1"
                class="rounded-xl"
                min-width="350px"
                min-height="350px"
                :src="
                  !playlist.loading
                    ? playlist.data.src
                      ? playlist.data.src
                      : ''
                    : ''
                "
                cover
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
        <v-card
          class="border rounded-xl fill-height text-grey-lighten-2"
          color="transparent"
          elevation="24"
          :loading="playlist.loading"
        >
          <v-row v-if="!playlist.loading" class="fill-height text-center pa-5">
            <v-col
              cols="12"
              v-ripple
              class="rounded-lg cursor-pointer"
              @click="modify.dialog = true"
            >
              <div>
                <v-card-title>
                  <h1 class="font-weight-black">
                    {{ playlist.data.name.toUpperCase() }}
                  </h1>
                </v-card-title>
                <v-card-subtitle>
                  <span class="text-h6 font-weight-light font-italic"
                    >"{{ playlist.data.description }}"</span
                  >
                </v-card-subtitle>
              </div>
            </v-col>
            <v-divider></v-divider>
            <v-col
              cols="6"
              v-ripple
              class="rounded-lg d-flex justify-center align-center cursor-pointer"
              @click="$router.push('/profile/' + playlist.data.user)"
            >
              <div class="px-4">
                <v-icon size="large">fa-solid fa-user</v-icon>
              </div>
              <div>
                <span class="text-button">{{ playlist.data.user }}</span>
              </div>
            </v-col>
            <v-col
              cols="6"
              v-ripple
              class="rounded-lg d-flex justify-center align-center"
            >
              <div class="px-4">
                <v-icon size="large">fa-solid fa-clock</v-icon>
              </div>
              <div>
                <span class="text-button"
                  >Total:
                  {{
                    millisToMinutesAndSeconds(this.playlist.totalDuration)
                  }}</span
                >
              </div>
            </v-col>
            <v-col
              cols="6"
              v-ripple
              class="rounded-lg d-flex justify-center align-center"
            >
              <div class="px-4">
                <v-icon size="large">fa-solid fa-list</v-icon>
              </div>
              <div>
                <span class="text-button"
                  >Number: {{ playlist.tracks.length }}</span
                >
              </div>
            </v-col>
            <v-col
              cols="6"
              v-ripple
              class="rounded-lg d-flex justify-center align-center"
            >
              <div class="px-4">
                <v-icon size="large">fa-solid fa-lock</v-icon>
              </div>
              <div>
                <span class="text-button">{{ playlist.data.access }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row v-else class="align-center fill-height">
            <v-col cols="12" v-ripple class="d-flex justify-center">
              <v-btn icon :loading="playlist.loading" variant="tonal"></v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center ga-5 ga-lg-12">
        <v-btn
          icon="fa-solid fa-tags"
          :loading="playlist.loading"
          :disabled="!playlist.editable"
          variant="tonal"
          :size="$vuetify.display.lgAndDown ? 'large' : 'x-large'"
          @click="insertTags.dialog = true"
        ></v-btn>
        <v-btn
          v-if="playlist.data"
          icon="fa-solid fa-heart"
          :color="playlist.isFavourite ? 'ternary' : ''"
          :loading="playlist.loading"
          variant="tonal"
          :size="$vuetify.display.lgAndDown ? 'large' : 'x-large'"
          @click="playlist.isFavourite ? dislikePressed() : likePressed()"
        ></v-btn>
        <v-btn
          icon="fa-solid fa-music"
          :loading="playlist.loading"
          :disabled="!playlist.editable"
          variant="tonal"
          :size="$vuetify.display.lgAndDown ? 'large' : 'x-large'"
          @click="insertTrack.dialog = true"
        ></v-btn>
        <v-btn
          icon="fa-solid fa-trash"
          :loading="playlist.loading"
          :disabled="!playlist.editable"
          variant="tonal"
          :size="$vuetify.display.lgAndDown ? 'large' : 'x-large'"
          @click="remove.dialog = true"
        ></v-btn>
        <v-btn
          icon="fa-solid fa-list"
          :loading="playlist.loading"
          variant="tonal"
          :size="$vuetify.display.lgAndDown ? 'large' : 'x-large'"
          @click="tracks.dialog = true"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-if="!playlist.loading">
    <v-row>
      <v-col cols="12">
        <ItemIteratorComponent
          :itemsToDisplay="playlist.tracks"
          :itemKeyName="'id'"
          :xs="2"
          :sm="2"
          :md="2"
          :lg="3"
          :xl="4"
        >
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
  <div class="pa-4 text-center">
    <v-dialog v-model="insertTrack.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg">
          <v-toolbar floating>
            <v-toolbar-title>Search a track!</v-toolbar-title>
          </v-toolbar>
          <v-text-field
            v-model="insertTrack.search"
            label="Search"
            append-inner-icon="fa-solid fa-search"
            density="compact"
            hide-details
            single-line
          ></v-text-field>
          <v-card-text style="height: 600px">
            <v-sheet>
              <div v-if="insertTrack.search">
                <v-list v-if="insertTrack.response.length !== 0">
                  <v-list-item
                    v-for="track in insertTrack.response"
                    :key="track.id"
                    :title="track.name"
                    :subtitle="track.album ? track.album.name : 'No album name'"
                    class="text-grey-lighten-2 rounded-lg"
                    link
                    @click="searchedTrackPressed(track.id)"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        size="x-large"
                        class="border-md rounded-lg"
                        rounded="0"
                        variant="text"
                      >
                        <v-img
                          lazy-src="/disc.png"
                          :src="
                            track.album
                              ? track.album.images[0]
                                ? track.album.images[0].url
                                : ''
                              : ''
                          "
                        ></v-img>
                      </v-avatar>
                    </template>
                    <template v-slot:append>
                      <v-icon
                        icon="fa-solid fa-link"
                        @click="$router.push('/track/' + track.id)"
                      ></v-icon>
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
            <v-btn text="close" @click="insertTrack.dialog = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <div class="pa-4 text-center">
    <v-dialog v-model="insertTags.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg" max-height="700px">
          <v-toolbar floating>
            <v-toolbar-title>Select the genres</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row dense>
              <v-col
                v-for="(item, index) in availableGenres"
                :key="index"
                cols="3"
                class="d-flex"
              >
                <v-btn
                  @click="selectGenre(item)"
                  class="flex-grow-1 rounded overflow-hidden"
                  :color="selectedGenres.includes(item) ? 'ternary' : ''"
                  :variant="selectedGenres.includes(item) ? 'tonal' : 'plain'"
                >
                  {{ item }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              text="close"
              @click="
                selectedGenres = playlist.data.tags;
                insertTags.dialog = false;
              "
            ></v-btn>
            <v-btn
              text="save"
              variant="tonal"
              @click="saveTagsPressed()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <div class="pa-4 text-center">
    <v-dialog v-model="modify.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg">
          <v-toolbar floating>
            <v-toolbar-title>Modify playlist info!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="modify.modifyForm" lazy-validation>
              <v-row dense>
                <v-col cols="6">
                  <v-text-field
                    v-model="modify.name"
                    label="Name"
                    variant="outlined"
                    :rules="[modify.rules.name.max, modify.rules.name.min]"
                    counter
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="playlist.access"
                    label="Access"
                    :items="modify.access"
                    item-title="name"
                    itme-value="value"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="modify.description"
                    label="Description"
                    variant="outlined"
                    :rules="[
                      modify.rules.description.max,
                      modify.rules.description.min,
                    ]"
                    counter
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="modify.src"
                    label="Src"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text="close" @click="modify.dialog = false"></v-btn>
            <v-btn
              text="save"
              variant="tonal"
              @click="savePlaylistPressed()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <div class="pa-4 text-center">
    <v-dialog v-model="tracks.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg" min-height="500px">
          <v-toolbar floating>
            <v-toolbar-title>Playlist tracks</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(track, i) in playlist.tracks"
                :key="i"
                class="rounded-lg"
                link
              >
                <template v-slot:prepend>
                  <v-avatar
                    size="x-large"
                    class="border-md rounded-lg"
                    rounded="0"
                    variant="text"
                  >
                    <v-img
                      lazy-src="/disc.png"
                      :src="
                        track.album
                          ? track.album.images[0]
                            ? track.album.images[0].url
                            : ''
                          : ''
                      "
                    ></v-img>
                  </v-avatar>
                </template>
                <a
                  :href="'/track/' + track.id"
                  style="text-decoration: none"
                  class="text-grey-lighten-2"
                >
                  <v-list-item-title
                    class="font-weight-regular"
                    v-text="track.name"
                  ></v-list-item-title>
                </a>
                <v-list-item-subtitle
                  v-text="track.album ? track.album.name : ''"
                >
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    @click="removeTrack(i)"
                    icon="fa-solid fa-trash"
                    color="red-lighten-2"
                    variant="text"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text="close" @click="tracks.dialog = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <div class="text-center pa-4">
    <v-dialog v-model="remove.dialog" width="auto">
      <v-card
        max-width="400"
        prepend-icon="fa-solid fa-triangle-exclamation"
        text="You're about to delete this playlist! Are you sure you want to continue?"
        title="Deleting playlist"
      >
        <template v-slot:actions>
          <v-btn text="Yes" @click="deletePlaylistPressed()"></v-btn>
          <v-btn
            variant="flat"
            color="ternary"
            text="No"
            @click="remove.dialog = false"
          ></v-btn>
        </template>
      </v-card>
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

import ItemIteratorComponent from "../components/ItemIteratorComponent.vue";
import TrackSheetComponent from "../components/TrackSheetComponent.vue";

export default {
  components: {
    ItemIteratorComponent,
    TrackSheetComponent,
  },

  data() {
    return {
      me: null,
      playlist: {
        id: this.$route.params.id,
        editable: false,
        loading: true,
        totalDuration: 0,
        data: null,
        access: "",
        tracks: [],
        isFavourite: false,
      },
      availableGenres: [],
      selectedGenres: [],
      insertTags: {
        dialog: false,
      },
      insertTrack: {
        search: "",
        dialog: false,
        response: [],
      },
      modify: {
        name: "",
        description: "",
        src: "",
        modifyForm: false,
        access: [
          { value: "private", name: "Private" },
          { value: "public", name: "Public" },
          { value: "followers", name: "Followers" },
        ],
        dialog: false,
        rules: {
          name: {
            min: (value) => value.length >= 3 || "At least 3 characters",
            max: (value) => value.length <= 30 || "At maximum 30 characters",
          },
          description: {
            min: (value) => value.length >= 3 || "At least 3 characters",
            max: (value) => value.length <= 100 || "At maximum 100 characters",
          },
        },
      },
      tracks: {
        dialog: false,
      },
      remove: {
        dialog: false,
      },
      errorSnackbar: {
        show: false,
        message: "",
      },
    };
  },

  async beforeMount() {
    await this.getMe();
    await this.getPlaylist();

    if (this.me.username === this.playlist.data.user)
      this.playlist.editable = true;

    await this.getPlaylistTracks();
    this.playlist.loading = false;

    await this.getAvailableGenres();
  },

  watch: {
    "insertTrack.search"(newValue) {
      this.sendSearchRequest(newValue);
    },
  },

  methods: {
    async getMe() {
      const me = await api.getMe();
      if (me.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = me.data.message;
        return;
      }

      this.me = me.data.user;
    },

    async getPlaylist() {
      const playlist = await api.getPlaylist(this.playlist.id);
      if (playlist.data.status === 404) {
        this.$router.push("/default");
        return;
      } else if (playlist.data.status === 403) {
        this.$router.push("/unauthorized");
        return;
      } else if (playlist.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = playlist.data.message;
        return;
      }

      this.playlist.data = playlist.data;
      this.selectedGenres = this.playlist.data.tags;
      this.playlist.access = this.playlist.data.access;
      this.modify.name = this.playlist.data.name;
      this.modify.description = this.playlist.data.description;
      this.modify.src = this.playlist.data.src || "";
      this.playlist.isFavourite = this.me.favourites.some(
        (item) => item._id === this.playlist.id
      );
    },

    async getPlaylistTracks() {
      if (this.playlist.data.songs.length > 0) {
        const tracks = await api.getTracks({ ids: this.playlist.data.songs });
        if (tracks.data.error) {
          this.errorSnackbar.show = true;
          this.errorSnackbar.message = tracks.data.message;
          return;
        }

        this.playlist.tracks = tracks.data.body.tracks;
        this.updateDuration();
      }
    },

    async getAvailableGenres() {
      const availableGenres = await api.getRecommendationsGenres();
      if (availableGenres.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = availableGenres.data.message;
        return;
      }

      this.availableGenres = availableGenres.data.body.genres;
    },

    async removeTrack(i) {
      const response = await api.removeSong(this.playlist.id, { position: i });
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
        return;
      }

      await this.getPlaylist();
      await this.getPlaylistTracks();
    },

    selectGenre(genre) {
      if (this.selectedGenres.includes(genre)) {
        this.selectedGenres = this.selectedGenres.filter((i) => i !== genre);
      } else {
        this.selectedGenres.push(genre);
      }
    },

    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },

    updateDuration() {
      this.playlist.totalDuration = 0;
      for (let t of this.playlist.tracks) {
        if (t && t.duration_ms) {
          this.playlist.totalDuration += t.duration_ms;
        }
      }
    },

    async saveTagsPressed() {
      const response = await api.modifyPlaylist(this.playlist.id, {
        tags: this.selectedGenres,
      });
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
      }

      this.insertTags.dialog = false;
    },

    async savePlaylistPressed() {
      this.$refs.form.validate();
      if (this.modify.modifyForm) {
        const response = await api.modifyPlaylist(this.playlist.id, {
          name: this.modify.name,
          description: this.modify.description,
          access: this.playlist.access.toLowerCase(),
          src: this.modify.src,
        });

        if (response.data.error) {
          this.errorSnackbar.show = true;
          this.errorSnackbar.message = response.data.message;
        }

        this.modify.dialog = false;
        await this.getPlaylist();
      }
    },

    async deletePlaylistPressed() {
      const response = await api.deletePlaylist(this.playlist.id);
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
        this.remove.dialog = false;
        return;
      }

      this.remove.dialog = false;
      this.$router.push("/home");
    },

    async spotifySearch(data) {
      const search = await api.makeSearch(data);
      if (search.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = search.data.message;
      }
      return search.data;
    },

    async sendSearchRequest(value) {
      if (!value) return;

      const response = [];
      const data = { q: value, types: ["track"], limit: 20 };
      const search = await this.spotifySearch(data);

      if (search.body.tracks) response.push(...search.body.tracks.items);
      this.insertTrack.response = response;
    },

    async likePressed() {
      const response = await api.likePlaylist(this.playlist.id);
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
        return;
      }

      this.playlist.isFavourite = true;
    },

    async dislikePressed() {
      const response = await api.dislikePlaylist(this.playlist.id);
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
        return;
      }

      this.playlist.isFavourite = false;
    },

    async searchedTrackPressed(id) {
      this.playlist.loading = true;
      const response = await api.insertSong(this.playlist.id, { songId: id });
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
        return;
      }

      this.playlist.tracks.push(id);
      await this.getPlaylist();
      await this.getPlaylistTracks();
      this.playlist.loading = false;
    },
  },
};
</script>

<style></style>
