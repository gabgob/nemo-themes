<template>
  <!-- <component
    :is="loadComponent(theme.components?.header)"
    :content="theme.content"
  />
  <component
    :is="loadComponent(theme.components?.footer)"
    :content="theme.content"
  /> -->
  <div v-if="data">
    <component
      :is="loadComponent(data.selected_theme, 'header')"
      :content="data"
    />
    <!-- <h1>{{ data.name }}</h1>
    <p v-html="data.intro"></p>

    <section v-for="(item, index) in data.content" :key="index">
      <h2>{{ item.title }}</h2>
      <div v-html="item.text"></div>
    </section>

    <nav>
      <ul>
        <li v-for="(page, index) in data.subpages" :key="index">
          <router-link :to="'/' + page.title.toLowerCase()">
            {{ page.title }}
          </router-link>
        </li>
      </ul>
    </nav> -->
  </div>
  <main>
    <router-view />
  </main>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";

const data = ref(null);
const selectedTheme = ref("default");

onMounted(async () => {
  const response = await fetch("/data.json");
  data.value = await response.json();

  console.log("här", data.value);
});

const loadComponent = (theme, component) => {
  if (component) {
    return defineAsyncComponent(() =>
      import(`./components/themes/${theme}/${component}.vue`)
    );
  }
  return "div";
};
/* 
const theme = computed(() => settings.value?.[selectedTheme.value] || {});

 */
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
}
</style>
