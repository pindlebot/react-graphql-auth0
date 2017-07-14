const logout = () => {
  window.localStorage.removeItem('auth0IdToken')
  location.reload()
}

module.exports = {
  logout,
}
