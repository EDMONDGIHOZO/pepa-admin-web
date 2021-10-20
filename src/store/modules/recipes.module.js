import recipeService from '../../services/recipe.service'

export const recipe = {
  namespaced: true,
  state: {
    all: [],
  },

  actions: {
    getAll({ commit }) {
      recipeService.index().then((recipes) => {
        commit('SET_ALL_RECIPES', recipes)
      })
    },
  },

  mutations: {
    SET_ALL_RECIPES(state, payload) {
      state.all = payload
    },
  },
}
