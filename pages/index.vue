<template>
  <v-app id="inspire">
    <Header></Header>
    <v-main class="grey lighten-2">
      <v-container>
        <v-row v-if="taskStatusList">
          <TaskSheet
            v-for="(status, index) in taskStatusList"
            :key="index"
            :status="status"
          ></TaskSheet>
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
        'TODO',
        'DOING',
        'DONE'
      ] 
    };
  }
})
</script>