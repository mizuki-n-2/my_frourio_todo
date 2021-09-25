<template>
  <v-row justify="center">
    <v-dialog
      v-model="currentDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">タスクの作成</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="タスク名"
                  required
                  @keydown.enter="emitAddTask"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="selectedStatus"
                  :items="taskStatusList"
                  label="ステータス"
                  single-line
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="emitCloseDialog()"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="emitAddTask"
          >
            作成
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Dialog',
  props: {
    status: {
      type: String,
      default: 'TODO'
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      taskStatusList: [
        'TODO',
        'DOING',
        'DONE'
      ],
      title: '',
      selectedStatus: 'TODO',
      currentDialog: false
    }
  },
  mounted() {
    this.currentDialog = this.dialog
    this.selectedStatus = this.status
  },
  methods: {
    emitCloseDialog() {
      this.$emit('closeDialog')
    },
    emitAddTask() {
      if(!this.title)
        return window.alert("タスク名を入力してくだいさい。")
      const task = {
        title: this.title,
        status: this.selectedStatus
      }
      this.$emit('addTask', task)
    }
  }
})
</script>