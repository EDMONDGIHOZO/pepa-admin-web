import userService from '../services/user-service'

export const app = {
  namespaced: true,
  state: {
    logo: require('../assets/images/pepa_logo.png'),
    ingredients_categories: [],
  },

  actions: {
    getIngeredientCategories({ commit }) {
      userService.getIngCategories().then((response) => {
        commit('setIngredientsCategories', response.data)
      })
    },
  },

  mutations: {
    setIngredientsCategories(state, payload) {
      state.ingredients_categories = payload
    },
  },
}
