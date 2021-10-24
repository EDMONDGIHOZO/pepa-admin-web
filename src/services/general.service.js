import axios from 'axios'
import authHeader from './auth-header'

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : '//pepa.yebalabs.com/'

// --------------------------------------------- basic app information from server ---------------------------------------------------- //

class GeneralService {
  async getDashboardSummary() {
    const results = axios.get(`${API_URL}admin/dashboard-summary`, {
      headers: authHeader(),
    })
    return results
  }
  async getFeatureds(typeName) {
    const results = axios.get(`${API_URL}api/v1/featured?type=${typeName}`, {
      headers: authHeader(),
    })
    return results
  }
  async removeFeatured(id) {
    const results = axios.delete(`${API_URL}admin/featured/remove/${id}`, {
      headers: authHeader(),
    })
    return results
  }
  async createFeatured(formData) {
    const results = axios.post(
      `${API_URL}admin/featured`,
      {
        item_id: formData.item_id,
        name: formData.name,
        type: formData.type,
      },
      {
        headers: authHeader(),
      },
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
  //   recipes
}

export default new GeneralService()
