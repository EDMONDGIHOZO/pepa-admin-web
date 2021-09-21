import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#038c4c',
        secondary: '#02733e',
        accent: '#01401C',
        error: '#b71c1c',
      },
    },
  },
})
