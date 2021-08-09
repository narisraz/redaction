export const state = () => ({
  list: []
})

export const mutations = {
  update(state, data) {
    state.list = data
  },
}