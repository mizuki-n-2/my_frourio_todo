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
      v-if="isLogin"
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
      v-if="isLogin"
      color="white"
      @click="emitLogout"
    >
      mdi-logout
    </v-icon>

  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Header',
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      links: [
        'カンバンボード'
      ] 
    };
  },
  methods: {
    emitLogout() {
      this.$emit('logout')
    }
  }
})
</script>