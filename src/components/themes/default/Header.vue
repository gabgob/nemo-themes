<template>
  <v-app-bar
    flat
    :class="{
      'header-menu': true,
      'under-header': mdAndUp && data.selected_theme === 'alternative',
    }"
  >
    <v-container v-if="data" fluid>
      <v-row class="d-flex align-center">
        <v-col offset-lg="1" offset-xl="2">
          <router-link :to="'/'">
            <v-img
              class="logotype"
              src="https://www.apoteketgodeherden.se/sites/all/themes/custom/ra_theme/logo.png"
              :alt="data.name + ' logotyp'"
              max-height="68"
              max-width="200"
              contain
            />
          </router-link>
        </v-col>
        <v-col offset="1" class="d-flex flex-row align-center">
          <router-link
            v-for="(page, index) in data.subpages"
            :key="index"
            :to="`/${page.title.toLowerCase().replace(/\s+/g, '-')}`"
            class="mr-6 text-black"
          >
            {{ page.title }}
          </router-link>
        </v-col>
        <v-col class="text-right">
          <v-btn
            v-if="$vuetify.display.smAndDown"
            variant="text"
            icon="mdi-menu"
            @click.stop="drawer = !drawer"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :to="item.value"
        @click="drawer = false"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();

const props = defineProps({
  data: { type: Object, default: () => {} },
});

const drawer = ref(false);

const items = computed(() => {
  return props.data.subpages.map((page) => ({
    title: page.title,
    value: `/${page.title.toLowerCase().replace(/\s+/g, "-")}`,
  }));
});
</script>

<style scoped>
.header-menu {
  padding: 20px 0;
  background-color: rgb(236, 236, 236) !important;
}

.v-toolbar .v-toolbar__content {
  height: 124px !important;
}

@media only screen and (max-width: 960px) {
  .logotype {
    max-width: 200px !important;
    max-height: 60px !important;
  }
}
</style>
