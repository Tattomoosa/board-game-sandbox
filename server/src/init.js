import _express from 'express'
import _http from 'http'
import _socketio from 'socket.io'
import shared from '../../shared/dist/index.js'
// import parseChatCommands from './chat-commands'
// remove
// import Vue from 'vue'
// remove
// import Vuex from 'vuex'

// console.log(shared)

let app = _express()
let http = _http.Server(app)
let io = _socketio(http)

const PORT = process.env.PORT || 4113

shared.Vue.use(shared.Vuex)

const store = shared.createStore()

http.listen(PORT, function() {
  console.log('listening on *: ' + PORT)
})

export {
  store,
  app,
  http,
  io,
}
