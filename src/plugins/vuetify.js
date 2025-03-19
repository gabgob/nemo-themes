import { createVuetify } from "vuetify";

const standardTheme = {
  dark: false,
  colors: {
    primary: "#047ac0",
    secondary: "#FFC107",
    accent: "#8c9eff",
    error: "#b71c1c",
    success: "#4CAF50",
    warning: "#FF9800",
    info: "#2196F3",
    background: "#FFFFFF",
  },
};

const someOtherTheme = {
  dark: false,
  colors: {
    primary: "#673AB7",
    secondary: "#FF5722",
    accent: "#E91E63",
    error: "#D32F2F",
    success: "#388E3C",
    warning: "#FFA000",
    info: "#0288D1",
    background: "#F5F5F5",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "standardTheme",
    themes: {
      standardTheme,
      someOtherTheme,
    },
  },
});
