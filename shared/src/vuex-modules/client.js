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
        if (state.selected == rootState.pieces[i].id)
          return rootState.pieces[i]
      return false
    },
    user: (state, getters, rootState) => {
      return rootState.users[localUser]
    }
  },
  actions: {
    setID ({ commit }, clientId) {
      commit('setID', clientId)
    },
    init ({ commit }, data) {
      commit('loadPieces', data.pieces, {root: true})
      commit('loadMessages', data.messages,  {root: true})
      commit('loadUsers', data.users, {root: true})
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
