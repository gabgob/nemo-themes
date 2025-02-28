<template>
  <footer class="footer">
    <p>Standard Footer</p>

    {{ content }}
  </footer>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  content: { type: Object, default: () => {} },
});
</script>

<style scoped>
.footer {
  background: lightgray;
  text-align: center;
  padding: 1rem;
}
</style>
