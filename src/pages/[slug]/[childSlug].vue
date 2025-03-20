<template>
  <div v-if="childData" class="content-container">
    <v-container>
      <v-row class="margin-top-large">
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
          <h1>{{ childData.title }}</h1>
          <div v-for="(content, index) in childData.content" :key="index">
            <div v-if="content.type === 'text'" v-html="content.text"></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  childSlug: {
    type: String,
    required: false,
  },
});

const route = useRoute();
const childData = ref(null);
const data = ref(null);

const loadChildData = async () => {
  try {
    if (!data.value) {
      const response = await fetch("/data.json");
      data.value = await response.json();
    }

    if (data.value && Array.isArray(data.value.subpages)) {
      const parentPage = data.value.subpages.find(
        (page) =>
          page.title.toLowerCase().replace(/\s+/g, "-") === route.params.slug
      );

      childData.value = parentPage.children.find(
        (child) =>
          child.title.toLowerCase().replace(/\s+/g, "-") ===
          route.params.childSlug
      );
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

onMounted(loadChildData);

watch(() => route.params.childSlug, loadChildData);
</script>
