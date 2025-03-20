<template>
  <header>
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
                  {{ data.phonenumber }}
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
                  {{ formatOpeningHours(data.opening_hours) }}
                </span>
              </p>
            </div>
            <v-spacer />
            <div class="d-flex align-center">
              <a
                v-if="data.facebook_url"
                :href="data.facebook_url"
                target="_blank"
              >
                <v-icon size="large"> mdi-facebook </v-icon>
              </a>

              <a
                v-if="data.instagram_url"
                :href="data.instagram_url"
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
        'under-header': mdAndUp && data.selected_theme === 'alternative',
        'fixed-top': isScrolled,
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
            <template v-for="(page, index) in data.subpages" :key="index">
              <router-link
                v-if="!page.children?.length"
                :to="`/${page.title.toLowerCase().replace(/\s+/g, '-')}`"
                class="mr-6 text-h6 nav-link"
              >
                {{ page.title }}
              </router-link>
              <v-menu
                v-else
                open-on-hover
                @update:model-value="parentMenuOpen = $event"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" link>
                    <v-list-item-title class="text-h6 nav-link">
                      <router-link
                        :to="`/${page.title
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`"
                        class="mr-6 text-h6 nav-link"
                      >
                        {{ page.title }}
                      </router-link>
                    </v-list-item-title>
                    <template v-slot:append>
                      <v-icon
                        icon="mdi-chevron-right"
                        class="transition-transform"
                        :class="{ 'rotate-90': parentMenuOpen }"
                        size="small"
                      />
                    </template>
                  </v-list-item>
                </template>

                <v-list>
                  <v-menu
                    open-on-hover
                    v-for="(childPage, index) in page.children"
                    :key="index"
                    offset-x
                    @update:model-value="toggleMenu(index, $event)"
                  >
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props" link>
                        <router-link
                          :to="{
                            path: `/${page.title
                              .toLowerCase()
                              .replace(/\s+/g, '-')}/${childPage.title
                              .toLowerCase()
                              .replace(/\s+/g, '-')}`,
                          }"
                          :childSlug="childPage.title"
                          class="sub-nav-link"
                        >
                          {{ childPage.title }}
                        </router-link>

                        <template v-if="childPage.children" v-slot:append>
                          <v-icon
                            icon="mdi-chevron-right"
                            size="small"
                            class="transition-transform"
                            :class="{ 'rotate-90': openMenus[index] }"
                          />
                        </template>
                      </v-list-item>
                    </template>

                    <v-list v-if="childPage.children">
                      <v-menu
                        open-on-hover
                        v-for="(subChildPage, subIndex) in childPage.children"
                        :key="subIndex"
                        offset-x
                      >
                        <template v-slot:activator="{ props }">
                          <v-list-item v-bind="props" link>
                            {{ subChildPage.title }}
                            <template
                              v-if="subChildPage.children"
                              v-slot:append
                            >
                              <v-icon
                                icon="mdi-chevron-right"
                                size="small"
                                class="transition-transform"
                              />
                            </template>
                          </v-list-item>
                        </template>

                        <v-list v-if="subChildPage.children">
                          <v-list-item
                            v-for="(
                              thirdChildPage, thirdIndex
                            ) in subChildPage.children"
                            :key="thirdIndex"
                            link
                          >
                            {{ thirdChildPage.title }}
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-list>
                  </v-menu>
                </v-list>
              </v-menu>
            </template>
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
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();

const props = defineProps({
  data: { type: Object, default: () => {} },
});

const drawer = ref(false);
const isScrolled = ref(false);
const parentMenuOpen = ref(false);
const openMenus = ref({});

const items = computed(() => {
  return props.data.subpages.map((page) => ({
    title: page.title,
    value: `/${page.title.toLowerCase().replace(/\s+/g, "-")}`,
  }));
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const googleMapsLink = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      props.data.address
    )}`
);

const formattedAddress = computed(() => props.data.address.split(",")[0]);

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

function toggleMenu(index, value) {
  openMenus.value[index] = value;
}
</script>

<style scoped>
header {
  height: 150px;
}

.over-header {
  width: 100%;
  font-size: 14px;
  background-color: #fff;
}

.header-menu {
  padding: 20px 0;
  background-color: #fff !important;
  transition: all 0.1s ease;
}

.v-toolbar .v-toolbar__content {
  height: 124px !important;
}

.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  margin-top: 0;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px !important;

  .v-toolbar__content {
    height: 64px !important;
  }
}

.nav-link {
  color: var(--v-theme-primary) !important;
  text-decoration: underline !important;
  font-weight: 500 !important;
}

.sub-nav-link {
  color: var(--v-theme-primary) !important;
  text-decoration: underline !important;
  font-weight: 500 !important;
}

.rotate-90 {
  transform: rotate(90deg);
}

.transition-transform {
  transition: transform 0.2s ease;
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
