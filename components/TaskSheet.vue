<template>
  <v-col
    cols="12"
    sm="4"
  >
    <h3>{{ status }}</h3>
    <v-sheet
      min-height="80vh"
      rounded="lg"
    >
      <!--  -->
    </v-sheet>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TaskSheet',
  props: {
    status: { default: '', type: String }
  }
})
</script>