import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/auth.module'
import { app } from './modules/app.module'
import { ingredientCategory } from './modules/ingredient-category.module'
import { ingredient } from './modules/ingredient.module'
import { recipeCategory } from './modules/recipe-category.module'
import { recipe } from './modules/recipes.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    app,
    ingredientCategory,
    ingredient,
    recipeCategory,
    recipe,
  },
})
