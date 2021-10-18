import axios from 'axios'
import authHeader from './auth-header'

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : '//pepa.yebalabs.com/'

class UserService {
  async getDashboardSummary() {
    const results = axios.get(`${API_URL}admin/dashboard-summary`, {
      headers: authHeader(),
    })
    return results
  }

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
  async deleteIngCategories(catId) {
    const res = await axios.delete(`${API_URL}admin/ing-cat/${catId}`, {
      headers: authHeader(),
    })
    return res
  }

  async createIngCategories(categoryInfo) {
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
  async editEngCategory(categoryInfo) {
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
  async viewEngCategory(catid) {
    const results = await axios.get(
      `${API_URL}api/v1/ing-cats/${catid}`,
      { headers: authHeader() },
      { errorHandle: false },
    )
    return results
  }

  async imageUploader(file, onUploadProgress) {
    let formData = new FormData()
    formData.append('file', file)
    const res = await axios.post(API_URL + 'media-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })

    return res
  }

  async createIngredient(formdata) {
    const res = await axios.post(
      API_URL + 'admin/ingredient/create',
      formdata,
      {
        headers: authHeader(),
      },
    )

    return res
  }

  async editEng(formdata, id) {
    const res = await axios.put(
      `${API_URL}admin/ingredient/update/${id}`,
      formdata,
      {
        headers: authHeader(),
      },
    )

    return res
  }
  async deleteIngredient(item) {
    let id = item.item_id

    const res = await axios.delete(`${API_URL}admin/ingredient/remove/${id}`, {
      headers: authHeader(),
    })
    return res
  }

  //   recipes
  async getRecipeCategories() {
    const response = await axios.get(`${API_URL}api/v1/recipe-cats`, {
      headers: authHeader(),
    })
    return response
  }
  async getRecipes() {
    const response = await axios.get(`${API_URL}api/v1/recipes`, {
      headers: authHeader(),
    })
    return response
  }
  async createRecipe(info) {
    const results = await axios.put(
      `${API_URL}admin/recipe/${info.id}`,
      {
        name: info.name,
        description: info.description,
        prep_time: info.prep_time,
        cook_time: info.cook_time,
        servings: info.servings,
        category_id: info.category_id,
        ingreds: info.ingredients,
      },
      { headers: authHeader() },
      { errorHandle: false },
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
