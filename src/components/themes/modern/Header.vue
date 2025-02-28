<template>
  <header class="header">
    <p>Standard Header</p>
    {{ content }}
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
  background: black;
  text-align: center;
  padding: 1rem;
}
</style>
