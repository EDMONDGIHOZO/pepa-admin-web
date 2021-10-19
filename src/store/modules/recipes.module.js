import recipeService from '../../services/recipe.service'

export const recipe = {
  namespaced: true,
  state: {
    recipes: [],
  },

  actions: {
    getAll({ commit }) {
      recipeService.index().then((response) => {
        commit('SET_ALL_RECIPES', response.data)
      })
    },
  },

  mutations: {
    SET_ALL_RECIPES(state, payload) {
      state.recipes = payload
    },
  },
}
