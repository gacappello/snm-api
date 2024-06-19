<template>
  <v-container class="pa-12 ma-12">
    <PlaylistSheetComponent v-bind="item" />
  </v-container>
</template>
<script>
import PlaylistSheetComponent from "../components/PlaylistSheetComponent.vue";

export default {
  components: {
    PlaylistSheetComponent,
  },
  data() {
    return {
      item: {
        _id: "666daa0d76009fc1684b1a64",
        tags: ["chill", "classical", "club", "comedy"],
        description:
          "'Single-origin coffee offal green juice 90's gastropub forage beard bicycle rights.'' - Violet Sipes",
        name: "Conduct",
        access: "private",
        src: "https://i.scdn.co/image/ab67616d0000b273987fb4c5ec8790e9f637a4a4",
        songs: ["2cl3STzwTmCH93choV3TCl", "0vOj0JVKv2bobFBBUTjgQF"],
        user: "Crooks6273",
        createdAt: "2024-06-18T12:21:14.503Z",
      },
    };
  },
};
</script>
