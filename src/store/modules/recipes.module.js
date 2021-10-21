import recipeService from '../../services/recipe.service'

export const recipe = {
  namespaced: true,
  state: {
    all: [],
    recipePaginatedData: null,
    recipe: null,
    isloading: false,
    isCreating: false,
    createdData: null,
    isupdating: false,
    isDeleting: false,
    deletedData: false,
  },

  getters: {
    recipesList: (state) => state.all,
    recipesPaginated: (state) => state.recipePaginatedData,
    recipe: (state) => state.recipe,
    isloading: (state) => state.isloading,
    isCreating: (state) => state.isCreating,
    isupdating: (state) => state.isupdating,
    createdData: (state) => state.createdData,
    updatedData: (state) => state.updatedData,

    isDeleting: (state) => state.isDeleting,
    deletedData: (state) => state.deletedData,
  },

  actions: {
    async getAll({ commit }) {
      commit('SET_IS_FETCHING', true)
      let url = `recipes?page=${1}`
      await recipeService
        .index(url)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_ALL_RECIPES', response.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async createRecipe({ commit }, inputs) {
      await recipeService
        .create(inputs)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_IS_CREATING', false)
            alert('successfully created a recipe')
            location.reload()
          }
        })
        .catch((error) => {
          console.log(error.response)
          commit('SET_IS_CREATING', false)
        })
    },

    async destroyRecipe({ commit, dispatch }, id) {
      await recipeService
        .destroy(id)
        .then((res) => {
          if (res.status === 200) {
            commit('SET_IS_DELETING', false)
            alert('done deletion')
          }
        })
        .catch((e) => {
          console.log(e)
        })
      dispatch('getAll')
    },
  },

  mutations: {
    SET_ALL_RECIPES(state, payload) {
      state.all = payload
    },
    SET_RECIPE_CREATED(state, payload) {
      state.recipe_created = payload
      state.message = 'done'
    },
    SET_IS_FETCHING(state, payload) {
      state.isloading = payload
    },
    SET_IS_DELETING(state, payload) {
      state.isDeleting = payload
    },
  },
}
