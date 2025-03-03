<template>
  <main v-if="pageData" class="content-container">
    <v-container>
      <v-row>
        <v-col
          cols="10"
          md="12"
          lg="10"
          xl="6"
          offset="1"
          offset-md="0"
          offset-lg="1"
          offset-xl="3"
        >
          <h1>{{ pageData.title }}</h1>
          <div v-for="(content, index) in pageData.content" :key="index">
            <div v-if="content.type === 'text'" v-html="content.text"></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pageData = ref(null);
const data = ref(null);

const loadPageData = async () => {
  try {
    if (!data.value) {
      const response = await fetch("/data.json");
      data.value = await response.json();
    }

    if (data.value && Array.isArray(data.value.subpages)) {
      pageData.value = data.value.subpages.find(
        (page) =>
          page.title.toLowerCase().replace(/\s+/g, "-") === route.params.slug
      );
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

onMounted(loadPageData);

watch(() => route.params.slug, loadPageData);
</script>

<style scoped></style>
