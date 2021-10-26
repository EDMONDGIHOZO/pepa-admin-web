import generalService from '../../services/general.service'

export const app = {
  namespaced: true,
  state: {
    logo: require('../../assets/images/pepa_logo.png'),
    dashboardSummary: [],
    mainMenu: [
      {
        title: 'Ingredients',
        icon: 'mdi-food-apple',
        subs: [
          { title: 'ingredients', icon: 'mdi-food', path: 'ingredients' },
          {
            title: 'categories',
            icon: 'mdi-view-headline',
            path: 'ingredient-categories',
          },
        ],
      },
      {
        title: 'Recipes',
        icon: 'mdi-food',
        subs: [
          { title: 'Recipes', icon: 'mdi-food', path: 'recipes' },
          { title: 'Featured', icon: 'mdi-star', path: 'featureds' },
          { title: 'categories', icon: 'mdi-eye', path: 'recipe-categories' },
        ],
      },
      {
        title: 'orders', icon: 'mdi-wheel-barrow', subs: [
          { title: 'All', icon: 'mdi-cart', path: 'orders' },
        ],
      },
      {
        title: 'users',
        icon: 'mdi-account-group',
        subs: [
          { title: 'all users', icon: 'mdi-account-group', path: 'users' },
        ],
      },
      {
        title: 'Settings',
        icon: 'mdi-account-group',
        subs: [
          { title: 'locations', icon: 'mdi-pin', path: "locations" },
        ],
      },
    ],
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
