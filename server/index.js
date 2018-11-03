import _express from 'express'
import _http from 'http'
import _socketio from 'socket.io'
import shared from '../shared/dist/index.js'
import Vue from 'vue'
// remove
// import Vuex from 'vuex'

// console.log(shared)

let app = _express()
let http = _http.Server(app)
let io = _socketio(http)

const PORT = process.env.PORT || 4113

  /*
app.use(_express.static('client'))

app.get('/', function(req, res) {
  // res.sendFile(__dirname + '/client/index.html')
})
*/

shared.Vue.use(shared.Vuex)

const store = shared.createStore()

io.on('connection', client => {
  // Name is changeable
  client.name = 'guest'
	console.log('user ' + client.id + ' connected')
	store.commit('addUser', client.id)
	client.broadcast.emit('user connected', store.state.users)

  // give client its id
  client.on('ready', () => {
		console.log('user ' + client.id + ' ready')

		io.to(client.id).emit('init client',
			{
				pieces: store.state.pieces,
				clientId: client.id,
				users: store.state.users,
				messages: store.state.messages
			}
		)
  })

  client.on('disconnect', function() {
    console.log('user ' + client.id + ' disconnected')
		store.commit('removeUser', client.id)
		client.broadcast.emit('user disconnected', store.state.users)
  })

  client.on('edited', data => {
		store.commit('setPiece', { ...store.getters.pieceWithId(data.id), ...data })
    client.broadcast.emit('edited', data)
  })

	client.on('create piece', () => {
		store.commit('createPiece')
		io.emit('create piece')
	})

	client.on('delete piece', data => {
		store.commit('deletePiece', data)
		io.emit('delete piece', data)
	})

	client.on('select piece', data => {
		store.commit('selectPiece', data)
		client.broadcast.emit('select piece', data)
	})

	function resetClient() {
		io.emit('reset client',
			{
				pieces: store.state.pieces,
				users: store.state.users,
				messages: store.state.messages
			}
		)
	}

  client.on('send message', (data) => {
    let { message } = data

    if (message.startsWith("\\setname "))
		{
			// CHANGE NAME
			let name = message.slice(9)
			store.commit('changeUsername', {name, clientId: client.id})
			// TODO we really only need to update the user's name
			resetClient()
		}
		else if (message.startsWith("\\resetclient"))
			resetClient()
    else {
			store.commit('addMessage', data)
      io.emit('message', data)
    }
  })
})

http.listen(PORT, function() {
  console.log('listening on *: ' + PORT)
})
