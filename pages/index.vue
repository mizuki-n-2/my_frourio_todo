<template>
  <v-app id="inspire">
    <Header :is-login="isLogin"></Header>
    <v-main class="grey lighten-2">
      <v-card
        class="mx-auto mt-10 px-10 py-10"
        max-width="500"
      >
        <v-form
          ref="form"
          lazy-validation
        >
          <v-card-title class="d-flex justify-center font-weight-bold">ログイン</v-card-title>

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

          <div class="d-flex justify-center mt-5">
            <v-btn
              color="blue"
              dark
              large
              @click="login"
            >
              ログイン
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
      ]
    }
  },
  methods: {
    async login () {
      if(!(this.$refs.form as Vue & { validate: () => boolean }).validate()) return

      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password })
      } catch (e) {
        if(e.response.status === 404)
          window.alert("該当するユーザが存在しません。\nメールアドレスまたはパスワードに間違いがないか確認してもう一度お試しください！")
      }

      this.$router.push('/tasks')
    }
  },
})
</script>