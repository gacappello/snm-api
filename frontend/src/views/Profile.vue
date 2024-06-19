<template>
  <v-container fluid class="pa-4 pa-sm-8 pa-lg-10 pa-xl-12 fill-height">
    <v-row class="fill-height">
      <v-col cols="12" sm="12" lg="4" xl="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-sheet
            class="rounded border-md fill-height"
            :elevation="isHovering ? 24 : 0"
            :border="isHovering ? 'lg' : 'md'"
            v-bind="props"
          >
            <v-card
              v-ripple
              min-height="500px"
              class="d-flex align-center flex-column justify-space-evenly text-grey fill-height"
              :color="isHovering ? 'ternary' : 'undefined'"
            >
              <div>
                <v-img
                  aspect-ratio="1"
                  src="/public/user.jpg"
                  color="ternary"
                  class="border-lg rounded-xl flex-grow-0"
                  width="250px"
                  height="250px"
                >
                </v-img>
              </div>
              <div class="text-h5 text-sm-h4 font-weight-light">
                <div class="text-caption text-sm-caption font-weight-light">
                  Profile of
                </div>
                {{
                  requestedUsernameData.username.toUpperCase()
                    ? requestedUsernameData.username.toUpperCase()
                    : "placeholder".toUpperCase()
                }}
                <div
                  class="text-caption text-sm-caption font-weight-light text-right"
                >
                  SNM user
                </div>
              </div>
              <div>
                <v-btn v-if="loading" icon="" :loading="loading"></v-btn>
                <v-btn
                  v-else-if="
                    !(requestedUsernameData.username === loggedUsername)
                  "
                  prepend-icon="fa-solid fa-check"
                  :text="
                    requestedUsernameData.following ? 'Unfollow' : 'Follow'
                  "
                  variant="tonal"
                ></v-btn>
                <v-btn
                  prepend-icon="fa-solid fa-gear"
                  v-else
                  text="modify profile"
                  variant="tonal"
                ></v-btn>
              </div>
            </v-card>
          </v-sheet>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="12" lg="8" xl="9" class="d-flex flex-column">
        <v-row>
          <v-col cols="6" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="rounded border-md fill-height"
                :elevation="isHovering ? 24 : 0"
                v-bind="props"
              >
                <v-card
                  v-ripple
                  min-height="200px"
                  class="d-flex align-center flex-column justify-space-evenly text-grey fill-height"
                  :color="isHovering ? 'ternary' : 'undefined'"
                >
                  <div class="text-h5 text-sm-h4 font-weight-thin">
                    FOLLOWERS
                  </div>
                  <div class="text-h5">
                    <v-icon>fa-solid fa-user</v-icon>
                  </div>
                  <v-btn v-if="loading" icon="" :loading="loading"></v-btn>
                  <div v-else class="text-h4 font-weight-light">
                    {{ requestedUsernameData.data.followers.length }}
                  </div>
                </v-card>
              </v-sheet>
            </v-hover>
          </v-col>
          <v-col cols="6" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="rounded border-md fill-height"
                :elevation="isHovering ? 24 : 0"
                v-bind="props"
              >
                <v-card
                  v-ripple
                  min-height="200px"
                  class="d-flex align-center flex-column justify-space-evenly text-grey fill-height"
                  :color="isHovering ? 'ternary' : 'undefined'"
                >
                  <div class="text-h5 text-sm-h4 font-weight-thin">FOLLOWS</div>
                  <div class="text-h5">
                    <v-icon>fa-solid fa-user</v-icon>
                  </div>
                  <v-btn v-if="loading" icon="" :loading="loading"></v-btn>
                  <div v-else class="text-h4 font-weight-light">
                    {{ requestedUsernameData.data.follows.length }}
                  </div>
                </v-card>
              </v-sheet>
            </v-hover>
          </v-col>
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="rounded border-md fill-height"
                :elevation="isHovering ? 24 : 0"
                v-bind="props"
              >
                <v-card
                  v-ripple
                  min-height="200px"
                  class="d-flex align-center flex-column justify-space-evenly text-grey fill-height"
                  :color="isHovering ? 'ternary' : 'undefined'"
                >
                  <div class="text-h5 text-sm-h4 font-weight-thin">
                    PLAYLISTS
                  </div>
                  <div class="text-h5">
                    <v-icon>fa-solid fa-music</v-icon>
                  </div>
                  <v-btn v-if="loading" icon="" :loading="loading"></v-btn>
                  <div v-else class="text-h4 font-weight-light">
                    {{ requestedUsernameData.playlists.length }}
                  </div>
                </v-card>
              </v-sheet>
            </v-hover>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <span class="text-h6 font-weight-light">
              {{ requestedUsernameData.username.toUpperCase() + "'S" }} PUBLIC
              PLAYLISTS
            </span>
          </v-col>
          <v-col cols="12">
            <v-data-iterator
              v-if="!loading"
              :items="
                requestedUsernameData.playlists.filter(
                  (p) => p.access === 'public'
                )
              "
              :items-per-page="itemsPerPage"
              class="fill-height"
            >
              <template
                v-slot:default="{ items, page, pageCount, prevPage, nextPage }"
                class="fill-height"
              >
                <v-row class="fill-height justify-start">
                  <v-col
                    cols="2"
                    md="1"
                    class="d-flex align-center justify-center"
                  >
                    <v-btn
                      icon="fa-solid fa-arrow-left"
                      :disabled="page === 1"
                      @click="prevPage"
                    ></v-btn>
                  </v-col>
                  <v-col
                    v-for="(item, index) in items"
                    :key="index"
                    cols="8"
                    sm="4"
                    md="3"
                    xl="2"
                  >
                    <PlaylistSheetComponent
                      :_id="item.raw._id"
                      :name="item.raw.name"
                      :access="item.raw.access"
                      :createdAt="item.raw.createdAt"
                      :src="item.raw.src"
                      :songs="item.raw.songs"
                    />
                  </v-col>
                  <v-col
                    cols="2"
                    md="1"
                    class="d-flex align-center justify-center ml-auto"
                  >
                    <v-btn
                      icon="fa-solid fa-arrow-right"
                      :disabled="page === pageCount"
                      @click="nextPage"
                    ></v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../api";
import { useDisplay } from "vuetify";
import PlaylistSheetComponent from "../components/PlaylistSheetComponent.vue";

export default {
  components: {
    PlaylistSheetComponent,
  },

  setup() {
    const display = useDisplay();
    return { display };
  },

  data() {
    return {
      loggedUsername: this.$cookies.get("user"),
      loading: true,
      requestedUsernameData: {
        username: this.$route.params.username,
        data: null,
        playlists: null,
        following: false,
      },
    };
  },

  computed: {
    itemsPerPage() {
      const { smAndUp, mdAndUp, xlAndUp } = this.display;
      if (xlAndUp.value) return 5;
      if (mdAndUp.value) return 3;
      if (smAndUp.value) return 2;
      return 1;
    },
  },

  methods: {
    async sendGetUserProfileRequest(username) {
      return await api.getUserProfile(username);
    },

    async sendGetPlaylistsOfUserRequest(username) {
      return await api.getPlaylistsOfUser(username);
    },

    async sendFollowRequest(username) {
      return await api.followUser(username);
    },

    async senUnfollowRequest(username) {
      return await api.unfollowUser(username);
    },

    async sendGetTrackRequest(id) {
      try {
        return await instance.post("/sapi/tracks/" + id);
      } catch (error) {
        return error.response;
      }
    },
  },

  async mounted() {
    this.loading = true;
    const usernameResponse = await this.sendGetUserProfileRequest(
      this.$route.params.username
    );
    if (usernameResponse.data.error || !usernameResponse.data.user) {
      this.$router.push("/home").then(() => {
        this.$router.go(0);
      });
    }

    const playlistsResponse = await this.sendGetPlaylistsOfUserRequest(
      this.$route.params.username
    );
    if (playlistsResponse.data.error) {
      // SNACKBAR
    }

    console.log(playlistsResponse.data);

    // for (
    //   let i = 0;
    //   i < this.itemsPerPage && i < playlistsResponse.data.playlists.length;
    //   i++
    // ) {
    //   playlistsResponse.data.playlists[i].src = undefined;
    //   if (playlistsResponse.data.playlists[i].songs.length > 0) {
    //     const trackResponse = await this.sendGetTrackRequest(
    //       playlistsResponse.data.playlists[i].songs[0]
    //     );
    //     if (!trackResponse.data.error) {
    //       playlistsResponse.data.playlists[i].src =
    //         trackResponse.data.body.album.images[0].url;
    //     }
    //   }
    // }

    this.requestedUsernameData.data = usernameResponse.data.user;
    this.requestedUsernameData.playlists = playlistsResponse.data.playlists;
    this.loading = false;
  },
};
</script>
