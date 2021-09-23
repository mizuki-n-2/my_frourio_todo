<template>
  <v-app id="inspire">
    <Header :is-login="isLogin"></Header>
    <v-main class="grey lighten-2">
      <v-container>
        <Dialog 
          v-if="dialog"
          :dialog="dialog"
          :status="dialogTaskStatus"
          @closeDialog="closeDialog"
          @addTask="addTask"
        ></Dialog>
        <v-row v-if="taskStatusList">
          <task-sheet
            v-for="(item, index) in taskStatusList"
            :key="index"
            :status="item.status"
            :color="item.color"
            :tasks="filteredTasks(item.status)"
            @openDialog="openDialog"
            @deleteTask="deleteTask"
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
import Dialog from '../components/Dialog.vue'

interface CreateTaskRequest {
  title: string
  status: 'TODO' | 'DOING' | 'DONE'
}

export default Vue.extend({
  components: {
    Header,
    TaskSheet,
    Dialog
  },
  data() {
    return {
      isLogin: true,
      dialog: false,
      dialogTaskStatus: 'TODO',
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
      ]
    };
  },
  methods: {
    filteredTasks(status: string) {
      return this.tasks.filter(task => task.status === status)
    },
    addTask(task: CreateTaskRequest) {
      this.closeDialog()

      // 今後はAPI通信に変更
      this.tasks.push({
        id: new Date().getMilliseconds(),
        ...task
      })
    },
    openDialog(status: string) {
      this.dialogTaskStatus = status
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    deleteTask(id: number) {
      // 今後はAPI通信に変更
      this.tasks = this.tasks.filter(task => task.id !== id)
    }
  }
})
</script>