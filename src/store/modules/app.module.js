import generalService from '../../services/general.service'

export const app = {
  namespaced: true,
  state: {
    logo: require('../../assets/images/pepa_logo.png'),
    dashboardSummary: [],
  },

  actions: {
    async getDashboardSummary({ commit }) {
      generalService.getDashboardSummary().then((response) => {
        if (response) {
          commit('SET_DASHBOARD', response.data)
        }
      })
    },
  },

  mutations: {
    SET_DASHBOARD(state, payload) {
      state.dashboardSummary = payload
    },
  },
}
