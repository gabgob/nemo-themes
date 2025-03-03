<template>
  <div class="over-header d-none d-md-block">
    <v-container class="py-0" fluid>
      <v-row>
        <v-col
          cols="10"
          md="12"
          lg="10"
          xl="8"
          offset="1"
          offset-md="0"
          offset-lg="1"
          offset-xl="2"
          class="d-flex flex-row"
        >
          <div class="d-flex align-center">
            <v-icon> mdi-phone-outline </v-icon>
            <p class="ml-2 pa-2">
              <span class="font-weight-light"> Nå oss på </span>
              <br />
              <span class="font-weight-medium">
                {{ content.phonenumber }}
              </span>
            </p>
          </div>
          <v-divider vertical class="mx-6" />
          <div class="d-flex align-center">
            <v-icon> mdi-map </v-icon>
            <p class="ml-2 pa-2">
              <span class="font-weight-light"> Vi finns här </span>
              <br />
              <span class="font-weight-medium">
                <a :href="googleMapsLink" target="_blank" class="text-black">
                  {{ formattedAddress }}
                </a>
              </span>
            </p>
          </div>
          <v-divider vertical class="mx-6" />
          <div class="d-flex align-center">
            <v-icon> mdi-clock-time-four-outline </v-icon>
            <p class="ml-2">
              <span class="font-weight-light"> Våra öppettider </span>
              <br />
              <span class="font-weight-medium">
                {{ formatOpeningHours(content.opening_hours) }}
              </span>
            </p>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex align-center">
            <a
              v-if="content.facebook_url"
              :href="content.facebook_url"
              target="_blank"
            >
              <v-icon size="large"> mdi-facebook </v-icon>
            </a>

            <a
              v-if="content.instagram_url"
              :href="content.instagram_url"
              target="_blank"
            >
              <v-icon size="large"> mdi-instagram </v-icon>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
  const days = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];

  let result = [];
  let tempGroup = [];
  let prevStart = null;
  let prevEnd = null;

  for (let i = 0; i < 7; i++) {
    const currentDay = data[i];
    const dayName = days[i];

    if (currentDay) {
      const { start, end } = currentDay;

      if (start === prevStart && end === prevEnd) {
        tempGroup.push(dayName);
      } else {
        if (tempGroup.length) {
          result.push(formatGroup(tempGroup, prevStart, prevEnd));
        }
        tempGroup = [dayName];
        prevStart = start;
        prevEnd = end;
      }
    } else {
      if (tempGroup.length) {
        result.push(formatGroup(tempGroup, prevStart, prevEnd));
        tempGroup = [];
      }
      result.push(`${dayName} Stängt`);
      prevStart = prevEnd = null;
    }
  }

  if (tempGroup.length) {
    result.push(formatGroup(tempGroup, prevStart, prevEnd));
  }

  return result.join(" ");
}

const formatTime = (time) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100 === 0 ? "00" : time % 100;
  return `${hours}:${minutes}`;
};

function formatGroup(days, start, end) {
  const dayRange =
    days.length > 1 ? `${days[0]} - ${days[days.length - 1]}` : days[0];
  return start === null || end === null
    ? `${dayRange} Stängt`
    : `${dayRange} (${formatTime(start)} - ${formatTime(end)})`;
}
</script>

<style scoped>
.over-header {
  width: 100%;
  font-size: 14px;
}

.header-menu {
  padding: 20px 0;
  background-color: rgb(236, 236, 236) !important;
}

.v-toolbar .v-toolbar__content {
  height: 124px !important;
}

@media only screen and (max-width: 1280px) {
  .over-header {
    font-size: 14px;
  }
}

@media only screen and (max-width: 960px) {
  .over-header {
    font-size: 9px;
  }

  .logotype {
    max-width: 200px !important;
    max-height: 60px !important;
  }
}
</style>
