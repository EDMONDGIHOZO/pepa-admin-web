import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3333/user/'

class AuthService {
  // login
  async login(user) {
    const response = await axios.post(
      API_URL + 'login',
      {
        email: user.email,
        password: user.password,
      },
      { headers: authHeader() },
    )
    if (response.data.accessToken) {
      localStorage.setItem(
        'userToken',
        JSON.stringify(response.data.accessToken),
      )
    }
    return response.data
  }

  //   user logout
  logout() {
    localStorage.removeItem('userToken')
  }

  //   adding user
  async register(user) {
    return axios.post(API_URL + 'register', {
      email: user.email,
      password: user.password,
      password_confirmation: '1234567',
      phones: user.phones,
    })
  }
}

export default new AuthService()
