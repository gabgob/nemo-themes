<template>
  <v-layout>
    <component
      v-if="data"
      :is="loadComponent(data.selected_theme, 'header')"
      :content="data"
    />
  </v-layout>

  <main v-if="data" style="margin-top: 105px">
    <router-view />
  </main>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";

const data = ref(null);

onMounted(async () => {
  const response = await fetch("/data.json");
  data.value = await response.json();
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
body {
  font-family: "Roboto", sans-serif;
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
  margin-top: 76px;
}

.v-img {
  min-width: 120px;
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
