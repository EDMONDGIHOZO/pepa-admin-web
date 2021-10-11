import axios from 'axios'
import authHeader from './auth-header'

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : '//pepa.yebalabs.com/'

class UserService {
  async getIngredients() {
    const res = await axios.get(API_URL + 'api/v1/ingredients')
    if (res.data.success) {
      return res.data.data
    }
  }
  async getIngCategories() {
    const res = await axios.get(API_URL + 'api/v1/ing-cats')
    if (res.data.success) {
      return res.data.data
    }
  }
  async createIngredient(info) {
    const results = await axios.post(
      API_URL + 'admin/ingredient/create',
      {
        name: info.name,
        description: info.description,
        unit_type: info.unit_type,
        unit_price: info.unit_price,
        image_url: info.image_url,
        category_id: info.category_id,
      },
      {
        headers: authHeader(),
      },
    )
    return results
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() })
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() })
  }
}

export default new UserService()
