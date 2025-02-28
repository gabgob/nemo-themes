<template>
  <header class="header">
    <h1>{{ content.title }}</h1>
  </header>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  content: { type: Object, default: () => {} },
});
</script>

<style scoped>
.header {
  background: #0082cf;
  text-align: center;
  padding: 1rem;
  color: white;
}
</style>
