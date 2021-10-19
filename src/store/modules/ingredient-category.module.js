import ingredientCategoryService from '../../services/ingredient-category.service'

export const ingredientCategory = {
  namespaced: true,
  state: {
    all: [],
    category: {},
  },

  actions: {
    getAll({ commit }) {
      ingredientCategoryService.index().then((response) => {
        commit('SET_ALL', response.data)
      })
    },
    getSingle({ commit }, category_id) {
      ingredientCategoryService.show(category_id).then((response) => {
        console.log(response)
        commit('SET_SINGLE_CATEGORY', response.data.data)
      })
    },
  },

  mutations: {
    SET_ALL(state, payload) {
      state.all = payload
    },
    SET_SINGLE_CATEGORY(state, payload) {
      state.category = payload
    },
  },

}
