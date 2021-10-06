import authService from '../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,

  //   actions
  actions: {
    register({ commit }, user_info) {
      return authService.register(user_info).then(
        (response) => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('registerFail')
          return Promise.reject(error)
        },
      )
    },

    login({ commit }, user) {
      return authService.login(user).then(
        (user) => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        (error) => {
          commit('loginFailed')
          return Promise.reject(error)
        },
      )
    },

    logout({ commit }) {
      authService.logout()
      commit('logout')
    },
  },
  mutations: {
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFail(state) {
      state.status.loggedIn = false
    },

    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
    },

    loginFailed(state) {
      state.status.loggedIn = false
      state.user = null
    },
  },
}
