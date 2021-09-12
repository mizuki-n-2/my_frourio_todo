<template>
  <v-col
    cols="12"
    sm="4"
  >
    <v-sheet
      min-height="85vh"
      rounded="lg"
    >
      <div :class="`sheet-title bg-${color}`">
        <div></div>
        <h3>{{ status }}</h3>
        <v-icon
          color="white"
          @click="emitOpenDialog(status)"
        >
          mdi-card-plus-outline
        </v-icon>
      </div>

      <task-card
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      ></task-card>

    </v-sheet>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskCard from './TaskCard.vue'

export default Vue.extend({
  name: 'TaskSheet',
  components: {
    TaskCard
  },
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

.bg-red {
  background-color: red;
}

.bg-green {
  background-color: green;
}

.bg-black {
  background-color: black;
}
</style>