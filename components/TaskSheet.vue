<template> 
  <v-col cols="12" sm="4">
    <v-sheet
      min-height="85vh"
      rounded="lg"
    >
      <div class="sheet-title" :style="`background-color: ${color}`">
        <div></div>
        <h3>{{ status }}</h3>
        <v-icon
          color="white"
          @click="emitOpenDialog(status)"
        >
          mdi-card-plus-outline
        </v-icon>
      </div>

      <div class="mx-2">
        <slot name="body"></slot>
      </div>
    </v-sheet>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TaskSheet',
  props: {
    status: {
      type: String,
      default: 'TODO'
    },
    color: {
      type: String,
      default: 'red'  
    },
    tasks: { 
      type: Array,
      default: () => ([{
        id: 0,
        title: '',
        status: 'TODO'
      }]) 
    }
  },
  methods: {
    emitOpenDialog(status: string) {
      this.$emit('openDialog', status)
    }
  }
})
</script>

<style scoped>
.sheet-title {
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  height: 50px;
  line-height: 50px;
  color: white;
}
</style>