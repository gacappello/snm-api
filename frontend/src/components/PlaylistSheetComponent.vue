<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-if="!loading"
      min-height="350px"
      max-height="350px"
      min-width="200px"
      max-width="350px"
      v-ripple
      hover
      class="rounded-lg"
      v-bind="props"
      @click="$router.push('/playlists/' + _id)"
    >
      <template v-slot:title>
        <div class="font-weight-black text-h4 gradient text-truncate pa-4">
          {{ name.charAt(0).toUpperCase() + name.slice(1) }}
        </div>
      </template>
      <template v-slot:image>
        <v-img
          :src="src"
          aspect-ratio="1"
          height="350px"
          lazy-src="/disc.png"
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
      </template>
      <v-expand-transition>
        <div
          v-if="isHovering"
          class="transition-fast-in-fast-out v-card--reveal"
        >
          <v-table density="comfortable">
            <tbody>
              <tr align="right">
                <th>Songs:</th>
                <td>{{ songs.length }}</td>
              </tr>
              <tr align="right">
                <th>Date:</th>
                <td>{{ createdAt.substring(0, 10) }}</td>
              </tr>
              <tr align="right">
                <th>Access:</th>
                <td>{{ access.charAt(0).toUpperCase() + access.slice(1) }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-expand-transition>
    </v-card>
    <v-skeleton-loader
      v-else
      min-height="350px"
      max-height="350px"
      min-width="200px"
      max-width="350px"
      type="card, text@6"
      v-ripple
      class="rounded-lg"
    >
    </v-skeleton-loader>
  </v-hover>
</template>
<script>
export default {
  props: {
    _id: String,
    name: String,
    access: String,
    createdAt: String,
    src: String,
    songs: Array,
    loading: {
      type: Boolean,
      default: false,
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
