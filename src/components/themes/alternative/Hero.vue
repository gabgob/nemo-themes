<template>
  <div v-if="data" class="content-container">
    <v-container>
      <v-row>
        <v-col cols="12" md="9" lg="6" xl="3" offset-xl="1">
          <div class="hero-box">
            <h1 class="text-h5" v-html="data.intro"></h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
defineProps({
  data: { type: Object, default: () => ({}) },
});
</script>

<style>
.hero-box {
  padding: 40px;
  margin-top: calc(50% - 150px);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: #047ac0;
  color: white;
}
</style>
