import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { ViteSSG } from "vite-ssg";
import { routes } from "./router";
import vuetify from "./plugins/vuetify";

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(vuetify);
});
