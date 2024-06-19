import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.VITE_PORT);

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  server: {
    port: port,
  },
});
