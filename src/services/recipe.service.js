import axios from 'axios'
import authHeader from './auth-header'

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : '//pepa.yebalabs.com/'

class RecipeService {
  // recipe categories section
  async create(inputs) {
    let res = await axios.post(
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
    return res
  }

  async index(url) {
    const response = await axios.get(`${API_URL}api/v1/${url}`, {
      headers: authHeader(),
    })
    return response
  }

  async destroy(id) {
    const res = await axios.delete(`${API_URL}admin/recipe/remove/${id}`, {
      headers: authHeader(),
    })
    return res
  }
}

export default new RecipeService()
