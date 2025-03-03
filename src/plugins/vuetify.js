import { createVuetify } from "vuetify";

export default createVuetify({
  components: {
    // No need to manually import components here if using Vuetify globally
  },
  directives: {
    // If you use directives, you can define them here
  },
  theme: {
    typography: {
      fontFamily: "Open Sans, sans-serif",
    },
  },
});
