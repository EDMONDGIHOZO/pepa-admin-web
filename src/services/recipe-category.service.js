import axios from 'axios'
import authHeader from './auth-header'

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : '//pepa.yebalabs.com/'

class RecipeCategoryService {
  // recipe categories section
  async create(categoryInfo) {
    const results = await axios.post(
      `${API_URL}admin/recipe-category`,
      {
        name: categoryInfo.name,
        description: categoryInfo.description,
        thumbnail: categoryInfo.thumbnail,
      },
      { headers: authHeader() },
      { errorHandle: false },
    )
    return results
  }

  async index() {
    const response = await axios.get(`${API_URL}api/v1/recipe-cats`, {
      headers: authHeader(),
    })
    return response.data
  }

  async destroy(category_id) {
    const res = await axios.delete(
      `${API_URL}admin/recipe-category/remove/${category_id}`,
      { headers: authHeader() },
    )
    return res
  }
}

export default new RecipeCategoryService()
