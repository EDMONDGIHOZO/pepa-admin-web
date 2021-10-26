import settingsService from "../../services/settings-service";

export const settings = {
  namespaced: true,
  state: {
    countries: [],
    provinces: [
      {
        id: "1",
        country_id: 1,
        name: "Kigali",
        active: false,
      },
    ],
    districts: [],
  },
  actions: {
    async fetchCountries({ commit }) {
      let res = await settingsService.getCountries();
      commit("SET_COUNTRIES", res.data);
    },
    async fetchProvinces({ commit }) {
      let res = await settingsService.getProvinces();
      commit("SET_PROVINCES", res.data);
    },
  },
  mutations: {
    SET_COUNTRIES(state, payload) {
      state.countries = payload;
    },
    SET_PROVINCES(state, payload) {
      state.provinces = payload;
    },
  },
  getters: {
    activeCountries: (state) => state.countries.filter((c) => c.active),
  },
};
