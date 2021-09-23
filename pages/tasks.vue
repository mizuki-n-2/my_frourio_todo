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
import type { CreateTaskRequest } from '$/types'

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
      dialogTaskStatus: '',
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
          id: 0,
          title: '',
          status: ''
        }
      ]
    };
  },
  async mounted() {
    this.tasks = await this.$api.tasks.$get({
      headers: {
        Authorization: `Bearer ${this.$store.getters.token}`
      }
    })
  },
  methods: {
    filteredTasks(status: string) {
      return this.tasks.filter(task => task.status === status)
    },
    async addTask(task: CreateTaskRequest) {
      this.closeDialog()

      const newTask = await this.$api.tasks.$post({
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        body: task
      })

      this.tasks.push({
        id: newTask.taskId,
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
    async deleteTask(id: number) {
      await this.$api.tasks._taskId(id).$delete({
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })

      this.tasks = this.tasks.filter(task => task.id !== id)
    }
  }
})
</script>