import axios from 'axios'

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
}

const state = {
  user: null,
}

const actions = {
  async LogIn(User) {
    await axios.post('user/login', User).then((response) => {
      //   set the user token to localstorage
      if (response.data.user.verified && response.data.user.role === 'admin') {
        localStorage.setItem('userToken', response.data.accessToken.token)
      } else {
        return Promise.reject('your must be an admin')
      }
    })
  },
  async LogOut({ commit }) {
    let user = null
    commit('logout', user)
  },
}

const mutations = {
  setUser(state, userInfo) {
    state.user = userInfo
  },
  logout(state, user) {
    state.user = user
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
