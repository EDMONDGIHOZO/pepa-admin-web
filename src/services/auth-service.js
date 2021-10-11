import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3333/user/'

class AuthService {
  async login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            'user',
            JSON.stringify(response.data.accessToken.token),
          )
        }

        return response.data
      })
  }

  async getProfile() {
    const results = await axios.get(API_URL + 'current-user', {
      headers: authHeader(),
    })
    if (results !== null) {
      return results
    }
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      email: user.email,
      phones: user.phones,
      password: user.password,
    })
  }
}

export default new AuthService()
