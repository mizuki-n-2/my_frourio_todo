<template>
  <v-app id="inspire">
    <Header :is-login="isLogin"></Header>
    <v-main class="grey lighten-2">
      <v-card
        class="mx-auto mt-10 px-10 py-8"
        max-width="500"
      >
        <v-form
          ref="form"
          lazy-validation
        >
          <v-card-title class="d-flex justify-center font-weight-bold">新規登録</v-card-title>

          <v-text-field
            v-model="name"
            counter="15"
            :rules="nameRules"
            label="名前"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="passwordRules"
            label="パスワード"
            required
            @click:append="show = !show"
          ></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || '確認したらチェックを入れてください!']"
            label="上記の内容でよろしいですか？"
            required
          ></v-checkbox>

          <div class="d-flex justify-center mt-5">
            <v-btn
              color="blue"
              dark
              large
              @click="registerUser"
            >
              登録
            </v-btn>
          </div> 
        </v-form>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.vue'

export default Vue.extend({
  components: {
    Header
  },
  data() {
    return {
      isLogin: false,
      name: '',
      nameRules: [
        (v: string) => !!v || '名前は必須です！',
        (v: string) => (v && v.length <= 15) || '名前は15文字以下にしてください！',
      ],
      email: '',
      emailRules: [
        (v: string) => !!v || 'メールアドレスは必須です！',
        (v: string) => /.+@.+\..+/.test(v) || 'メールアドレスの形式が正しくありません！',
      ],
      password: '',
      show: false,
      passwordRules: [
        (v: string) => !!v || 'パスワードは必須です！',
        (v: string) => v.length >= 8 || 'パスワードは8文字以上にしてください！',
      ],
      checkbox: false,
    }
  },
  methods: {
    async registerUser () {
      if(!(this.$refs.form && this.$refs.form.validate())) return

      try {
        await this.$api.users.$post({
          body: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
      } catch (e) {
        
      }
    }
  },
})
</script>