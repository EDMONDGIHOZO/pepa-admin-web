import ingredientService from '../../services/ingredient.service'

export const ingredient = {
  namespaced: true,
  state: {
    all: [],
    loaded: false,
    tempIngredients: [],
    deleted: null,
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
    getAll({ commit }) {
      ingredientService.index().then((response) => {
        commit('SET_ALL', response)
      })
    },

    destroy({ commit }, id) {
      commit('DELETED')
      let details = {
        item_id: id,
      }
      ingredientService.destroy(details)
    },

    // this is used while creating a recipe, the selected ingredients are saved in state bofore being posted
    addTempIngredient({ commit }, details) {
      commit('ADD_TEMPOLARY_INGREDIENTS', details)
    },
    removeTempIngredient({ commit }, id) {
      commit('REMOVE_TEMPOLARY_INGREDIENT', id)
    },
  },

  mutations: {
    SET_ALL(state, payload) {
      state.all = payload
      state.loaded = true
    },
    DELETED(state, payload) {
      state.deleted = payload
    },
    ADD_TEMPOLARY_INGREDIENTS(state, payload) {
      state.tempIngredients.push(payload)
    },
    REMOVE_TEMPOLARY_INGREDIENT(state, id) {
      let index = state.tempIngredients.findIndex(
        (ing) => ing.ingredient_id == id,
      )
      state.tempIngredients.splice(index, 1)
    },
  },
}
