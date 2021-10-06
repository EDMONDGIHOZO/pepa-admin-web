// data access for administration staff
import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3333/api/v1'
const API_URL_ADMIN = 'http://localhost:3333/admin'

class UserService {
  // data for everyone in the team

  //   ---- Recipes ---------------
  async getRecipes() {
    return axios.get(`${API_URL}/recipes`)
  }
  // data for inventory managers
  async createRecipeCategory(details) {
    return axios.post(`${API_URL_ADMIN}/recipe-category/create`)
  }
  // data for sales and delivery
  // data for super admin users
}
