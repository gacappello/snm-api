<template>
  <v-container fluid class="mt-4 text-grey-lighten-2">
    <v-row dense>
      <v-col cols="12" class="text-center text-h4">
        <h1>SNM Home</h1>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="mt-4 mx-lg-10 text-grey-lighten-2">
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-light"> YOUR PLAYLISTS </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-light"> FOLLOWS PLAYLISTS </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-light"> OTHER PLAYLISTS </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-light"> FAVOURITES PLAYLISTS </span>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "../api";

import ItemIteratorComponent from "../components/ItemIteratorComponent.vue";
import PlaylistSheetComponent from "../components/PlaylistSheetComponent.vue";

export default {
  components: {
    ItemIteratorComponent,
    PlaylistSheetComponent,
  },
  data() {
    return {};
  },
};
</script>
