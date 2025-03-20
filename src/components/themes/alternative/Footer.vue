<template>
  <footer>
    <v-container class="footer-container">
      <div class="copyright">
        &copy; {{ new Date().getFullYear() }} {{ data.name }}
      </div>
    </v-container>
    <transition name="fade-slide">
      <v-btn
        icon
        class="scroll-to-top"
        v-show="showArrow"
        @click="scrollToTop"
        elevation="4"
      >
        <v-icon icon="mdi-arrow-up-bold" />
      </v-btn>
    </transition>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

defineProps({
  data: { type: Object, default: () => ({}) },
});

const showArrow = ref(false);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function checkScroll() {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollPosition = window.innerHeight + window.scrollY;
  showArrow.value = scrollPosition >= scrollHeight * 0.9;
}

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
}

.copyright {
  text-align: center;
  margin-top: auto;
  padding-top: 20px;
  color: #666;
  font-size: 14px;
}

.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #1976d2;
  color: white;
  transition: background-color 0.3s ease;
  z-index: 9999;
}

.scroll-to-top:hover {
  background-color: #0d47a1;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}
</style>
