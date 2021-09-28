import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#465902',
        secondary: '#A1A621',
        accent: '#D97823',
        third: "#A63F03",
        darkred: "#730202",
        error: '#b71c1c',
      },
    },
  },
})
