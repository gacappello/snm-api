import { createApp } from "vue";

import VueCookies from "vue-cookies";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { VDateInput } from "vuetify/labs/components";

import router from "./router";

import App from "./App.vue";

const myTheme = {
  dark: true,
  colors: {
    primary: "#121212",
    secondary: "#212121",
    ternary: "#1db954",
  },
};

const vuetify = createVuetify({
  components: {
    components,
    VDateInput,
  },
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: "myTheme",
    themes: {
      myTheme,
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(VueCookies);

app.mount("#app");
