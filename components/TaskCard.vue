<template>
  <v-card
    class="mx-auto mt-2"
    max-width="344"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ task.title }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon 
          large
          @click="emitDeleteTask"
        >
          mdi-delete-forever
        </v-icon>
      </v-list-item-icon>
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
  },
  methods: {
    emitDeleteTask() {
      this.$emit('deleteTask', { id: this.task.id, status: this.task.status })
    }
  }
})
</script>

<style scoped>
.card {
  z-index: 10;
}
</style>