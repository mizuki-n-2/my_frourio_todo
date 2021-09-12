<template>
  <v-card
    class="mx-auto mt-2"
    max-width="344"
    outlined
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ task.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TaskCard',
  props: {
    task: { 
      type: Object,
      default: () => ({
        id: 0,
        title: '',
        status: 'TODO'
      })
    }
  }
})
</script>