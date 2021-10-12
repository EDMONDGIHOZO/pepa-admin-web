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

  async createIngCategories(categoryInfo) {
    const results = await axios.post(
      `${API_URL}admin/ing-cat`,
      {
        name: categoryInfo.name,
        description: categoryInfo.description,
        image_url:
          'https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg',
      },
      { headers: authHeader() },
      { errorHandle: false },
    )

    return results

    // await axios
    //   .post(
    //     API_URL + 'admin/ing-cat',
    //     {
    //       name: categoryInfo.name,
    //       description: categoryInfo.description,
    //       image_url:
    //         'https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg',
    //     },
    //     { headers: authHeader() },
    //   )
    //   .catch((error) => {
    //     console.log(error)
    //   })
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
