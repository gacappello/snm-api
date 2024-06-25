<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      min-height="350px"
      max-height="350px"
      min-width="200px"
      max-width="350px"
      v-ripple
      hover
      class="rounded-lg"
      v-bind="props"
      @click="$router.push('/track/' + _id)"
    >
      <template v-slot:title v-if="!fetching">
        <div class="font-weight-black text-h4 gradient text-truncate pa-4">
          {{ tName.charAt(0).toUpperCase() + tName.slice(1) }}
        </div>
      </template>
      <template v-slot:image>
        <v-img
          :src="tSrc"
          aspect-ratio="1"
          height="350px"
          width="350px"
          lazy-src="/disc.png"
          cover
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                v-if="!error.error"
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
              <v-icon v-else size="large">
                fa-solid fa-exclamation-triangle
              </v-icon>
            </div>
          </template>
        </v-img>
      </template>
      <v-expand-transition v-if="!error.error">
        <div
          v-if="isHovering"
          class="transition-fast-in-fast-out v-card--reveal"
        >
          <v-table density="comfortable">
            <tbody>
              <tr align="right">
                <th>Artist:</th>
                <td>{{ tArtistName }}</td>
              </tr>
              <tr align="right">
                <th>Duration:</th>
                <td>{{ millisToMinutesAndSeconds(tDurationMs) }}</td>
              </tr>
              <tr align="right">
                <th>Explicit:</th>
                <td>{{ tExplicit }}</td>
              </tr>
              <tr align="right">
                <th>Album:</th>
                <td>{{ tAlbumName }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>
<script>
import api from "../api";

export default {
  props: {
    _id: {
      type: String,
      required: true,
    },
    makeRequest: {
      type: Boolean,
      default: true,
    },
    name: { type: String },
    src: { type: String },
    artistName: { type: String },
    durationMs: { type: Number },
    explicit: { type: Boolean },
    albumName: { type: String },
  },

  computed: {
    tName() {
      return !this.makeRequest
        ? this.name
        : !this.fetching
        ? this.data.name
        : "";
    },
    tSrc() {
      return !this.makeRequest
        ? this.src
        : !this.fetching
        ? this.data
          ? this.data.album.images[0]
            ? this.data.album.images[0].url
            : ""
          : ""
        : "";
    },
    tArtistName() {
      return !this.makeRequest
        ? this.artistName
        : !this.fetching
        ? this.data
          ? this.data.artists[0]
            ? this.data.artists[0].name
            : ""
          : ""
        : "";
    },
    tDurationMs() {
      return !this.makeRequest
        ? this.durationMs
        : !this.fetching
        ? this.data
          ? this.data.durationMs
            ? this.data.durationMs
            : 0
          : 0
        : 0;
    },
    tExplicit() {
      return !this.makeRequest
        ? this.explicit
          ? "Yes"
          : "No"
        : !this.fetching
        ? this.data
          ? this.data.explicit
            ? "Yes"
            : "No"
          : "No"
        : "No";
    },
    tAlbumName() {
      return !this.makeRequest
        ? this.albumName
        : !this.fetching
        ? this.data
          ? this.data.album
            ? this.data.album.name
            : ""
          : ""
        : "";
    },
  },

  data() {
    return {
      error: {
        message: "",
        error: false,
      },
      fetching: true,
      data: null,
    };
  },

  async beforeMount() {
    if (this.makeRequest) {
      const track = await api.getTrack(this._id);
      if (track.data.error) {
        this.error.error = true;
        this.error.message = track.data.error.message;
        return;
      }

      this.data = track.data.body;
    }

    this.fetching = false;
  },

  methods: {
    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },
  },
};
</script>

<style>
.gradient {
  background: linear-gradient(
    to bottom,
    rgba(var(--v-theme-secondary), 0.8),
    transparent
  );
}

.gradient-big {
  height: 400px;
  background: linear-gradient(
    to bottom,
    rgba(var(--v-theme-secondary), 0.8),
    transparent
  );
}

.v-card--reveal {
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.95;
  position: absolute;
}

.v-card-item {
  padding: 0px;
}
</style>
