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
  async featured(url) {
    const response = await axios.get(`${API_URL}api/v1/featured?type=${url}`, {
      headers: authHeader(),
    })
    return response
  }
  async show(recipe_id) {
    const res = await axios.get(`${API_URL}api/v1/recipes/${recipe_id}`)
    return res
  }
  async approve(details) {
    const res = await axios.put(
      `${API_URL}admin/recipe/approve/${details.id}`,
      { active: details.active },
      { headers: authHeader() },
    )
    return res
  }
  async update(details) {
    const res = await axios.put(
      `${API_URL}admin/recipe/${details.id}`,
      {
        name: details.name,
        description: details.description,
        cook_time: details.cook_time,
        prep_time: details.prep_time,
        category_id: details.category_id,
        ingreds: details.ingreds,
        servings: details.servings,
      },
      { headers: authHeader() },
    )
    return res
  }

  async destroy(id) {
    const res = await axios.delete(`${API_URL}admin/recipe/remove/${id}`, {
      headers: authHeader(),
    })
    return res
  }
}

export default new RecipeService()
