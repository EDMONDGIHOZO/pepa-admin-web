import generalService from '../../services/general.service'

export const Featureds = {
  namespaced: true,
  state: {
    all: null,
    recipes: null,
    ingredients: null,
    loading: false,
    deleting: false,
    adding: false,
    message: '',
    showMessage: false,
    messageType: '',
  },
  actions: {
    //set data based on the type
    getFeatured({ commit }, type) {
      commit('SET_LOADING', true)
      generalService
        .getFeatureds(type)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_ALL_FEATURED', response.data)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    removeFeatured({ commit, dispatch }, id) {
      commit('SET_DELETING', true)
      generalService
        .removeFeatured(id)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getFeatured')
            commit('SET_DELETING', false)
          }
        })
        .catch((e) => {
          console.log(e.response)
        })
    },
    addFeatured({ commit, dispatch }, formData) {
      commit('SET_ADDING', true)
      generalService
        .createFeatured(formData)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getFeatured')
            commit('SET_RESPONSE_INFO', {
              message: 'successful',
              type: 'success',
            })
          }
        })
        .catch((e) => {
          if (e.response.status === 422) {
            alert('this recipe is already featured')
          } else {
            console.log(e.response.data.errors)
          }
        })
        .finally(commit('SET_ADDING', false))
    },
  },
  mutations: {
    SET_ALL_FEATURED(state, payload) {
      state.all = payload
      state.loading = false
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_DELETING(state, payload) {
      state.deleting = payload
    },
    SET_ADDING(state, payload) {
      state.adding = payload
    },
    SET_RESPONSE_INFO(state, payload) {
      state.messageType = payload.type
      state.message = payload.message
      state.showMessage = true
      state.adding = false
    },
  },
}
