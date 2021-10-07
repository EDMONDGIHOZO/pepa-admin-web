import Axios from 'axios'

let URL = 'http://localhost:3333/api/v1'

const instance = Axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})

export default instance
