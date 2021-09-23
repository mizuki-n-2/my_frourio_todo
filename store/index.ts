import { GetterTree, ActionTree, MutationTree } from 'vuex/types'

export const state = () => ({
  token: ''
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  token: (state) => state.token
}

export const mutations: MutationTree<RootState> = {
  SET_TOKEN: (state, newToken: string) => (state.token = newToken),
  REMOVE_TOKEN: (state) => (state.token = '')
}

export const actions: ActionTree<RootState, RootState> = {
  async login({ commit }, val) {
    const res = await this.$api.auth.$post({
      body: {
        email: val.email,
        password: val.password
      }
    })

    commit('SET_TOKEN', res.token)
  },
  logout({ commit }) {
    commit('REMOVE_TOKEN')
  }
}
