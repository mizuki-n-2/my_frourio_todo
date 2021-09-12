<template>
  <v-app id="inspire">
    <Header></Header>
    <v-main class="grey lighten-2">
      <v-container>
        <v-row v-if="taskStatusList">
          <task-sheet
            v-for="(item, index) in taskStatusList"
            :key="index"
            :status="item.status"
            :color="item.color"
            :tasks="filteredTasks(item.status)"
          ></task-sheet>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.vue'
import TaskSheet from '../components/TaskSheet.vue'

export default Vue.extend({
  components: {
    Header,
    TaskSheet
  },
  data() {
    return {
      taskStatusList: [
        {
          status: 'TODO',
          color: 'red'
        },
        {
          status: 'DOING',
          color: 'green'
        },
        {
          status: 'DONE',
          color: 'black'
        }
      ],
      tasks: [
        {
          id: 1,
          status: 'TODO',
          title: 'wake up'
        },
        {
          id: 2,
          status: 'DOING',
          title: 'breakfast'
        },
        {
          id: 3,
          status: 'DONE',
          title: 'dinner'
        },
      ],
    };
  },
  methods: {
    filteredTasks(status: string) {
      return this.tasks.filter(task => task.status === status)
    },
  }
})
</script>