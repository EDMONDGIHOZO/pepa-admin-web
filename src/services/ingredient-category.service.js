import axios from 'axios'
import authHeader from './auth-header'

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : '//pepa.yebalabs.com/'

class IngredientCategoryService {
  // --------------------------------------------- ingredients categories section ---------------------------------------------------- //
  async create(categoryInfo) {
    const results = await axios.post(
      `${API_URL}admin/ing-cat`,
      {
        name: categoryInfo.name,
        description: categoryInfo.description,
        image_url: categoryInfo.image_url,
      },
      { headers: authHeader() },
      { errorHandle: false },
    )

    return results
  }

  async index() {
    const res = await axios.get(API_URL + 'api/v1/ing-cats')
    if (res.data.success) {
      return res.data.data
    }
  }

  async show(category_id) {
    const results = await axios.get(
      `${API_URL}api/v1/ing-cats/${category_id}`,
      { headers: authHeader() },
      { errorHandle: false },
    )
    return results
  }

  async update(categoryInfo) {
    const results = await axios.put(
      `${API_URL}admin/ing-cat/${categoryInfo.id}`,
      {
        name: categoryInfo.name,
        description: categoryInfo.description,
        image_url: categoryInfo.image_url,
      },
      { headers: authHeader() },
      { errorHandle: false },
    )

    return results
  }

  async destroy(catId) {
    const res = await axios.delete(`${API_URL}admin/ing-cat/${catId}`, {
      headers: authHeader(),
    })
    return res
  }
}

export default new IngredientCategoryService()
