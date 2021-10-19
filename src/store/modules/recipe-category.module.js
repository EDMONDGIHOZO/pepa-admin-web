import recipeCategoryService from '../../services/recipe-category.service'

export const recipeCategory = {
  namespaced: true,
  state: {
    all: [],
  },

  actions: {
    getAll({ commit }) {
      recipeCategoryService.index().then((response) => {
        commit('SET_RECIPE_CATEGORIES', response.data)
      })
    },
  },

  mutations: {
    SET_RECIPE_CATEGORIES(state, payload) {
      state.recipeCategories = payload
    },
  },
}
