export default function authHeader() {
  let usertoken = JSON.parse(localStorage.getItem('user'))

  if (usertoken) {
    return { Authorization: 'Bearer ' + usertoken }
  } else {
    return {}
  }
}
