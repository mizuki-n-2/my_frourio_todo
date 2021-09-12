<template>
  <v-app-bar
    app
    color="blue"
  >

    <v-icon 
      large
      color="white"
    >
      mdi-home-analytics
    </v-icon>

    <v-tabs
      centered
      color="white"
    >
      <v-tab
        v-for="link in links"
        :key="link"
      >
        {{ link }}
      </v-tab>
    </v-tabs>

    <v-icon
      color="white"
    >
      mdi-logout
    </v-icon>

  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Header',
  data() {
    return {
      links: [
        'カンバンボード'
      ] 
    };
  }
})
</script>