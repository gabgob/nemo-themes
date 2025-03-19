<template>
  <v-container class="info-boxes-container" fluid>
    <v-row>
      <v-col cols="12" md="10" class="mx-auto">
        <v-row>
          <v-col>
            <div class="d-flex flex-wrap justify-center">
              <v-sheet
                v-for="(pageContent, index) in data.content"
                :key="index"
                class="info-box ma-8"
                v-html="pageContent.text"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  data: { type: Object, default: () => ({}) },
});
</script>

<style scoped>
.info-boxes-container {
  background-color: #f8f8f8;
}

.info-box {
  background-color: white;
  width: 450px;
  padding: 40px;
  transition: all 0.5s;
}

.info-box:hover {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

@media only screen and (max-width: 960px) {
  .info-box {
    width: 100%;
  }
}
</style>
