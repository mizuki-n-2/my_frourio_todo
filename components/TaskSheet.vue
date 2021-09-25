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

      <draggable v-model="tasks" draggable=".task" group="tasks" @change="changeTaskStatus">
        <task-card
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          class="task"
          @emitDeleteTask="emitDeleteTask"
        ></task-card>
      </draggable>

    </v-sheet>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

export default Vue.extend({
  name: 'TaskSheet',
  components: {
    TaskCard,
    draggable
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
    },
    emitDeleteTask(id: number) {
      this.$emit('deleteTask', id)
    },
    changeTaskStatus(event: any) {
      if(event.added) {
        const id = event.added.element.id
        const status = this.status
        this.$emit('changeTaskStatus', {id, status})
      }
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