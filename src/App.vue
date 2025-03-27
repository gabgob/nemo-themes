<template>
  <v-layout class="page-layout">
    <component
      v-if="data"
      :is="loadComponent(data.selected_theme, 'Header')"
      :data="data"
    />

    <main v-if="data">
      <component
        v-if="data && $route.path === '/'"
        :is="loadComponent(data.selected_theme, 'Hero')"
        :data="data"
      />
      <component
        v-if="data && $route.path === '/'"
        :is="loadComponent(data.selected_theme, 'MainContent')"
        :data="data"
      />

      <router-view />
    </main>

    <component
      v-if="data"
      :is="loadComponent(data.selected_theme, 'Footer')"
      :data="data"
    />
  </v-layout>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
/* import { useTheme } from "vuetify";

const theme = useTheme(); */

const data = ref(null);

onMounted(async () => {
  const response = await fetch("/data.json");
  data.value = await response.json();

  console.log(data.value);
});

const loadComponent = (theme, component) => {
  if (component) {
    return defineAsyncComponent(() =>
      import(`./components/themes/${theme}/${component}.vue`)
    );
  }
  return "div";
};
</script>

<style>
body,
html,
#app {
  height: 100%;
  margin: 0;
}

.v-layout.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body {
  font-family: "Roboto", sans-serif;
}

main {
  flex: 1;
}

header {
  width: 100%;
}

.main-header {
  background-color: rgb(235, 235, 235);
  padding: 30px 0;
}

.over-header {
  font-size: 14px;
  padding: 5px 0;
}

.under-header {
  margin-top: 68px;
}

.v-img {
  min-width: 120px;
}

.content-container {
  background-image: url("/assets/bg.jpg");
  min-height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.margin-top-large {
  margin-top: 110px !important;
}

@media only screen and (max-width: 1280px) {
  .over-header {
    font-size: 11px;
  }
}

@media only screen and (max-width: 960px) {
  .over-header {
    font-size: 9px;
  }

  .main-header {
    padding: 25px 15px;
  }
}
</style>
