export default function authHeader() {
  let current_user = JSON.parse(localStorage.getItem('userToken'))

  if (current_user && current_user.token) {
    return { Authorization: 'Bearer' + current_user.token.accessToken.token }
  } else {
    return { Accept: 'application/json', 'Content-type': 'application/json' }
  }
}
