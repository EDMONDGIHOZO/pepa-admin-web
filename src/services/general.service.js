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
