import userService from '../services/user-service'

export const app = {
  namespaced: true,
  state: {
    logo: require('../assets/images/pepa_logo.png'),
    ingredients_categories: [],
    ingredients: [],
    deleted: null,
    dashboardSummary: [],
    unit_types: [
      {
        id: '23',
        name: 'KG',
      },
      {
        id: '23342',
        name: 'L',
      },
    ],
  },

  actions: {
    async getDashboardSummary({ commit }) {
      userService.getDashboardSummary().then((response) => {
        if (response) {
          commit('setDashboard', response.data)
        }
      })
    },

    getIngeredientCategories({ commit }) {
      userService.getIngCategories().then((response) => {
        commit('setIngredientsCategories', response.data)
      })
    },
    getingredients({ commit }) {
      userService.getIngredients().then((response) => {
        commit('setIngredients', response)
      })
    },
    deleteIngredient({ commit }, id) {
      commit('deleted')
      let details = {
        item_id: id,
      }
      userService.deleteIngredient(details)
    },
  },

  mutations: {
    setDashboard(state, payload) {
      state.dashboardSummary = payload
    },
    setIngredientsCategories(state, payload) {
      state.ingredients_categories = payload
    },

    setIngredients(state, payload) {
      state.ingredients = payload
    },
    deleted(state, payload) {
      state.deleted = payload
    },
  },
}
