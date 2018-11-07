import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    id: null,
    io:{},
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
    init ({ commit }, data) {
      commit('setID', data.clientId)
      commit('setIO', data.io)
      commit('loadPieces', data.pieces, { root: true })
      commit('loadMessages', data.messages,  { root: true })
      commit('loadUsers', data.users, { root: true })
    },
    reset ({ commit }, data) {
      commit('loadPieces', data.pieces, { root: true })
      commit('loadMessages', data.messages, { root: true })
      commit('loadUsers', data.users, { root: true })
    },
    selectPiece ({ state, commit }, pieceId) {
      let data = {
        clientId: state.id,
        pieceId: pieceId
      }
      console.log('client select piece', data)
      commit('selectPiece', pieceId)
      commit('selectPiece', data, { root: true })
      state.io.emit('select piece', pieceId)
    }
  },
  mutations: {
    // sets client id
    setID (state, clientId) {
      Vue.set(state, 'id', clientId)
    },
    selectPiece (state, pieceId, rootState) {
      Vue.set(state, 'selected', [pieceId])
    },
    setIO (state, io) {
      Vue.set(state, 'io', io)
    }
  },
}
