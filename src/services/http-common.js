import Axios from 'axios'

let URL = 'http://localhost:3333/user/'

export default Axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})
