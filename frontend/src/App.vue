<template>
  <v-app>
    <div class="singer"></div>
    <NavbarComponent />
    <v-main style="z-index: 1">
      <router-view> </router-view>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
