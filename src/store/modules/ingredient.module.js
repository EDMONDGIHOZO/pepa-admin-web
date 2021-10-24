import ingredientService from '../../services/ingredient.service'

export const ingredient = {
  namespaced: true,
  state: {
    all: [],
    loaded: false,
    tempIngredients: [],
    doneDeletion: false,
    deleteDialog: false,
    initialIngredients: [],
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
      let details = {
        item_id: id,
      }
      ingredientService
        .destroy(details)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_DELETE_DIALOG', false)
            return 'success'
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            alert('this ingredient can not be deleted!')
            commit('SET_DELETE_DIALOG', false)
          }
        })
    },

    // this is used while creating a recipe, the selected ingredients are saved in state bofore being posted
    setInitialRecipeIngredients({ commit }, ings) {
      commit('SET_INITIALS', ings)
    },
    addTempIngredient({ commit }, details) {
      commit('ADD_TEMPOLARY_INGREDIENTS', details)
    },
    removeTempIngredient({ commit }, id) {
      commit('REMOVE_TEMPOLARY_INGREDIENT', id)
    },
    setDeleteDialog({ commit }, pld) {
      commit('SET_DELETE_DIALOG', pld)
    },
  },

  mutations: {
    SET_ALL(state, payload) {
      state.all = payload
      state.loaded = true
    },
    SET_INITIALS(state, payload) {
      state.initialIngredients = payload
    },

    DELETED(state, payload) {
      state.deleted = payload
    },
    SET_DELETE_DIALOG(state, payload) {
      state.deleteDialog = payload
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

  getters: {
    allIngredients: (state) => {
      return state.all
    },
  },
}
