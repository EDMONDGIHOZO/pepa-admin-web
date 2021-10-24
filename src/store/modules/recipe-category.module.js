import recipeCategoryService from '../../services/recipe-category.service'

export const recipeCategory = {
  namespaced: true,
  state: {
    all: [],
    single: null,
  },

  actions: {
    getAll({ commit }) {
      recipeCategoryService.index().then((response) => {
        commit('SET_RECIPE_CATEGORIES', response.data)
      })
    },
    getSingle({ commit }, id) {
      commit('SET_IS_FETCHING', true)
      recipeCategoryService.show(id).then((res) => {
        if (res.status === 200) {
          commit('SET_SINGLE', res.data)
        }
      })
    },
  },

  mutations: {
    SET_RECIPE_CATEGORIES(state, payload) {
      state.all = payload
    },
  },

  getters: {
    all: (state) => state.all,
  },
}
