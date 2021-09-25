<template>
  <v-app id="inspire">
    <Header :is-login="isLogin" @logout="logout"></Header>
    <v-main class="grey lighten-2">
      <v-container>
        <Dialog 
          v-if="dialog"
          :dialog="dialog"
          :status="dialogTaskStatus"
          @closeDialog="closeDialog"
          @addTask="addTask"
        ></Dialog>

        <v-row>
          <task-sheet
            :status="status='TODO'" 
            :color="color='red'"
            @openDialog="openDialog"
          >
            <template slot="body">
              <draggable v-model="toDoTasks" draggable=".task" group="task" @change="changeTaskStatus('TODO', $event)">
                <task-card
                  v-for="task in toDoTasks"
                  :key="task.id"
                  :task="task"
                  class="task"
                  @deleteTask="deleteTask"
                ></task-card>
              </draggable>
            </template>
          </task-sheet>
          <task-sheet
            :status="status='DOING'"  
            :color="color='green'"
            @openDialog="openDialog"
          >
            <template slot="body">
              <draggable v-model="doingTasks" draggable=".task" group="task" @change="changeTaskStatus('DOING', $event)">
                <task-card
                  v-for="task in doingTasks"
                  :key="task.id"
                  :task="task"
                  class="task"
                  @deleteTask="deleteTask"
                ></task-card>
              </draggable>
            </template>
          </task-sheet>
          <task-sheet 
            :status="status='DONE'"
            :color="color='black'"
            @openDialog="openDialog"
          >
            <template slot="body">
              <draggable v-model="doneTasks" draggable=".task" group="task" @change="changeTaskStatus('DONE', $event)">
                <task-card
                  v-for="task in doneTasks"
                  :key="task.id"
                  :task="task"
                  class="task"
                  @deleteTask="deleteTask"
                ></task-card>
              </draggable>
            </template>
          </task-sheet>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from "vuedraggable";
import Header from '../components/Header.vue'
import TaskSheet from '../components/TaskSheet.vue'
import TaskCard from '../components/TaskCard.vue'
import Dialog from '../components/Dialog.vue'
import type { CreateTaskRequest } from '$/types'
import  { TaskStatus } from '$prisma/client'

interface updateTaskInfo {
  id: number
  status: TaskStatus
}

export default Vue.extend({
  components: {
    Header,
    TaskSheet,
    TaskCard,
    Dialog,
    draggable
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
      toDoTasks: [
        {
          id: 0,
          title: '',
          status: ''
        }
      ],
      doingTasks: [
        {
          id: 0,
          title: '',
          status: ''
        }
      ],
      doneTasks: [
        {
          id: 0,
          title: '',
          status: ''
        }
      ],
    };
  },
  async mounted() {
    try {
      const allTasks = await this.$api.tasks.$get({
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })

      this.toDoTasks = allTasks.filter(task => task.status === 'TODO')
      this.doingTasks = allTasks.filter(task => task.status === 'DOING')
      this.doneTasks = allTasks.filter(task => task.status === 'DONE')
    } catch (e) {
      if(e.response.status === 401) {
        window.alert("認証に失敗しました。\n再度ログインを行ってください。")
        this.$router.push('/')
      }
    }
  },
  methods: {
    async addTask(task: CreateTaskRequest) {
      this.closeDialog()

      const newTask = await this.$api.tasks.$post({
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        body: task
      })
      
      if(task.status === 'TODO')
        this.toDoTasks.push({
          id: newTask.taskId,
          ...task
        })
      if(task.status === 'DOING')
        this.doingTasks.push({
          id: newTask.taskId,
          ...task
        })
      if(task.status === 'DONE')
        this.doneTasks.push({
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
    async deleteTask(taskInfo: updateTaskInfo) {
      await this.$api.tasks._taskId(taskInfo.id).$delete({
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })

      if(taskInfo.status === 'TODO')
        this.toDoTasks = this.toDoTasks.filter(task => task.id !== taskInfo.id)
      if(taskInfo.status === 'DOING')
        this.doingTasks = this.doingTasks.filter(task => task.id !== taskInfo.id)
      if(taskInfo.status === 'DONE')
        this.doneTasks = this.doneTasks.filter(task => task.id !== taskInfo.id)
    },
    async changeTaskStatus(status: TaskStatus, event: any) {
      if(event.added){
        await this.$api.tasks._taskId(event.added.element.id).$patch({
          headers: {
            Authorization: `Bearer ${this.$store.getters.token}`
          },
          body: {
            status
          }
        })
      }
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
})
</script>