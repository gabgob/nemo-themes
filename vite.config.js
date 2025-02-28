import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [vue(), Pages(), vuetify()],
  ssr: {
    noExternal: ["vuetify"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
