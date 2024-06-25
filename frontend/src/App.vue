<template>
  <v-app>
    <div
      class="singer"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>
    <NavbarComponent />
    <v-main style="z-index: 1">
      <router-view @changeBackground="updateBackground"> </router-view>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  emits: ["changeBackground"],
  components: {
    NavbarComponent,
    FooterComponent,
  },
  methods: {
    updateBackground(newImage) {
      this.backgroundImage = newImage || "/singer.jpeg";
    },
  },
  data() {
    return {
      backgroundImage: "/singer.jpeg",
    };
  },
};
</script>

<style></style>
