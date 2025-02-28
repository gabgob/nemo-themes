<template>
  <component
    :is="loadComponent(theme.components?.header)"
    :content="theme.content"
  />
  <component
    :is="loadComponent(theme.components?.footer)"
    :content="theme.content"
  />

  <v-radio-group v-model="selectedTheme">
    <v-radio label="Default" value="default" />
    <v-radio label="Modern" value="modern" />
  </v-radio-group>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";

const settings = ref(null);
const selectedTheme = ref("default");

onMounted(async () => {
  const response = await fetch("/data/settings.json");
  settings.value = await response.json();
  selectedTheme.value = settings.value.selectedTheme;
});

const theme = computed(() => settings.value?.themes[selectedTheme.value] || {});

const loadComponent = (component) => {
  if (component) {
    return defineAsyncComponent(() =>
      import(`../components/themes/${selectedTheme.value}/${component}.vue`)
    );
  }
  return "div";
};
</script>
