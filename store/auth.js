export const state = () => ({
  authenticated: false,
  loggedUser: {}
})

export const mutations = {
  authenticate(state, user) {
    state.authenticated = true
    state.loggedUser = user
  },
}