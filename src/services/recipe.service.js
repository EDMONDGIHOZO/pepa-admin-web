import axios from 'axios'
import authHeader from './auth-header'

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : '//pepa.yebalabs.com/'

class RecipeService {
  // recipe categories section
  async create(inputs) {
    const results = await axios.post(
      `${API_URL}admin/recipe`,
      {
        name: inputs.name,
        description: inputs.description,
        prep_time: inputs.prep_time,
        cook_time: inputs.cook_time,
        servings: inputs.servings,
        category_id: inputs.category_id,
        ingreds: inputs.ingreds,
      },
      { headers: authHeader() },
      { errorHandle: false },
    )
    return results
  }

  async index() {
    const response = await axios.get(`${API_URL}api/v1/recipes`, {
      headers: authHeader(),
    })
    return response.data
  }
}

export default new RecipeService()
