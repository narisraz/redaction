export const state = () => ({
  list: [],
})

export const mutations = {
  update(state, data) {
    state.list = data
  },
}

export const getters = {
  getPossibleStatus: (state) => (currentStatus) => {
    return state.list
      .filter(s => s.level == (1 + parseInt(currentStatus.level)) || s.level == (parseInt(currentStatus.level) - 1) || s.level == parseInt(currentStatus.level))
  }
}