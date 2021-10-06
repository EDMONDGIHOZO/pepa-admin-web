import axios from 'axios'

const API_URL = 'http://localhost:3333/user/'

class AuthService {
  // login
  async login(user) {
    const response = await axios.post(API_URL + 'login', {
      email: user.email,
      password: user.password,
    })
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }

  //   user logout
  logout() {
    localStorage.removeItem('user')
  }

  //   adding user
  async register(user) {
    return axios.post(API_URL + 'register', {
      email: user.email,
      password: '1234567',
      password_confirmation: '1234567',
      phones: user.phones,
    })
  }
}
