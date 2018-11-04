import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    id: null,
    selected: []
  },
  getters: {
    selectedPiece: (state, getters, rootState) => {
      for (let i = 0; i < rootState.pieces.length; i++)
        if (rootState.pieces[i].selected == true)
          return rootState.pieces[i]
    },
    user: (state, getters, rootState) => {
      return rootState.users[localUser]
    }
  },
  actions: {
    setID ({ commit }, clientId) {
      commit('setID', clientId)
    }
  },
  mutations: {
    // sets client id
    setID (state, clientId) {
      Vue.set(state, 'id', clientId)
    },
    selectPiece (state, piece, rootState) {
      Vue.set(state, 'selected', [piece.id])
    }
  }
}
