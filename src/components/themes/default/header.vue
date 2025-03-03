<template>
  <v-app-bar
    flat
    :class="{
      'header-menu': true,
      'under-header': mdAndUp && content.selected_theme === 'alternative',
    }"
  >
    <v-container v-if="content" fluid>
      <v-row class="d-flex align-center">
        <v-col offset-lg="1" offset-xl="2">
          <router-link :to="'/'">
            <v-img
              class="logotype"
              src="https://www.apoteketgodeherden.se/sites/all/themes/custom/ra_theme/logo.png"
              :alt="content.name + ' logotyp'"
              max-height="68"
              max-width="200"
              contain
            />
          </router-link>
        </v-col>
        <v-col offset="1" class="d-flex flex-row align-center">
          <router-link
            v-for="(page, index) in content.subpages"
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
  content: { type: Object, default: () => {} },
});

const drawer = ref(false);

const items = computed(() => {
  return props.content.subpages.map((page) => ({
    title: page.title,
    value: `/${page.title.toLowerCase().replace(/\s+/g, "-")}`,
  }));
});

const googleMapsLink = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      props.content.address
    )}`
);

const formattedAddress = computed(() => props.content.address.split(",")[0]);

function formatOpeningHours(data) {
  const daysMap = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];

  const formatTime = (time) => {
    let hours = Math.floor(time / 100);
    let minutes = time % 100 === 0 ? "00" : time % 100;
    return `${hours}.${minutes}`;
  };

  let dataMap = new Map(data.map((d) => [d.day, d]));

  let result = [];
  let tempGroup = [];
  let prevStart = null,
    prevEnd = null;

  for (let i = 1; i <= 7; i++) {
    if (dataMap.has(i)) {
      let { start, end } = dataMap.get(i);
      if (start === prevStart && end === prevEnd) {
        tempGroup.push(daysMap[i - 1]);
      } else {
        if (tempGroup.length) {
          result.push({ days: tempGroup, start: prevStart, end: prevEnd });
        }
        tempGroup = [daysMap[i - 1]];
        prevStart = start;
        prevEnd = end;
      }
    } else {
      if (tempGroup.length) {
        result.push({ days: tempGroup, start: prevStart, end: prevEnd });
        tempGroup = [];
      }
      result.push({ days: [daysMap[i - 1]], closed: true });
      prevStart = null;
      prevEnd = null;
    }
  }

  if (tempGroup.length) {
    result.push({ days: tempGroup, start: prevStart, end: prevEnd });
  }

  return result
    .map(({ days, start, end, closed }) => {
      let dayString =
        days.length > 1 ? `${days[0]} - ${days[days.length - 1]}` : days[0];
      return closed
        ? `${dayString} Stängt`
        : `${dayString} (${formatTime(start)} - ${formatTime(end)})`;
    })
    .join(" \n ");
}
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
