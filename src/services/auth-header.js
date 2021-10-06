export default function authHeader() {
  let current_user = JSON.parse(localStorage.getItem('user'))

  if (current_user && current_user.token) {
    return { Authorization: 'Bearer' + current_user.token }
  } else {
    return {}
  }
}
