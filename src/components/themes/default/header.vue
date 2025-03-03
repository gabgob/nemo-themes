<template>
  <v-container fluid class="pa-0">
    <header class="d-flex flex-column">
      <div class="over-header d-none d-md-block">
        <v-row>
          <v-col cols="10" offset="1" offset-xl="2" class="d-flex flex-row">
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
            <div class="socials-container d-flex align-center">
              <v-icon size="large"> mdi-facebook </v-icon>
              <v-icon size="large" class="ml-2"> mdi-instagram </v-icon>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="main-header">
        <v-row>
          <v-col lg="8" offset-lg="2" offset-xl="2" class="d-flex flex-row">
            <v-row class="d-flex align-center">
              <v-col cols="6" sm="3" xl="2">
                <v-img
                  src="
https://www.apoteketgodeherden.se/sites/all/themes/custom/ra_theme/logo.png"
                  :alt="content.name + ' logotyp'"
                  width="100%"
                />
              </v-col>
              <v-spacer class="d-md-none"></v-spacer>
              <v-col class="text-right mr-4 d-md-none">
                <v-icon size="x-large"> mdi-menu </v-icon>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <!-- <v-row>
        <v-col cols="6" offset="2" class="over-header py-7">
          <div class="d-flex flex-row align-center">
            {{ content.phonenumber }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" offset="2" class="main-header"> test 2 </v-col>
      </v-row> -->
    </header>
  </v-container>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  content: { type: Object, default: () => {} },
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

  // Function to format time from 900 to 9:00 and 1900 to 19:00
  const formatTime = (time) => {
    let hours = Math.floor(time / 100);
    let minutes = time % 100 === 0 ? "00" : time % 100;
    return `${hours}.${minutes}`;
  };

  // Create a map of provided days
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

  // Format the grouped result
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
.header {
  background: #0082cf;
  text-align: center;
  padding: 1rem;
  color: white;
}

.main-header {
  background-color: rgb(235, 235, 235);
  padding: 30px 0;
}

.over-header {
  font-size: 14px;
  padding: 5px 0;
}

@media only screen and (max-width: 1280px) {
  .over-header {
    font-size: 11px;
  }
}

@media only screen and (max-width: 960px) {
  .over-header {
    font-size: 9px;
  }

  .main-header {
    padding: 25px 15px;
  }
}
</style>
