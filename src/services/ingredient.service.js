import axios from 'axios'
import authHeader from './auth-header'

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : '//pepa.yebalabs.com/'

class IngredientService {
  // --------------------------------------------- ingredients section ---------------------------------------------------- //
  async create(formdata) {
    const res = await axios.post(
      API_URL + 'admin/ingredient/create',
      formdata,
      {
        headers: authHeader(),
      },
    )
    return res
  }

  async index() {
    const res = await axios.get(API_URL + 'api/v1/ingredients')
    if (res.data.success) {
      return res.data.data
    }
  }

  async update(formdata, id) {
    const res = await axios.put(
      `${API_URL}admin/ingredient/update/${id}`,
      formdata,
      {
        headers: authHeader(),
      },
    )
    return res
  }

  async destroy(item) {
    let id = item.item_id
    const res = await axios.delete(`${API_URL}admin/ingredient/remove/${id}`, {
      headers: authHeader(),
    })
    return res
  }
}

export default new IngredientService()
