import { store, app, http, io } from './init'
import parseChatCommands from './chat-commands'

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

  // TODO right now resets users instead of just removing the one that
  // disconnected.  This is wasteful. Should users even be removed?
  // maybe better to set active: false?
  client.on('disconnect', () => {
    // console.log('user ' + client.id + ' disconnected')
    let message = 'User ' + store.state.users[client.id].name + ' has disconnected'
    // store.commit('removeUser', client.id)
    store.commit('addMessage', { message })
    client.broadcast.emit('user disconnected', store.state.users)
    client.broadcast.emit('message', {message})
  })

  client.on('edited', data => {
    let setPieceObj = { ...store.getters.pieceWithId(data.id), ...data }
    // store.commit('setPiece', { ...store.getters.pieceWithId(data.id), ...data })
    store.commit('setPiece', setPieceObj)
    store.commit('pushDirtyState', { type: 'edited', ...setPieceObj })
    //client.broadcast.emit('edited', data)
  })

  client.on('create piece', () => {
    store.commit('createPiece')
    io.emit('create piece')
  })

  client.on('delete piece', data => {
    store.commit('deletePiece', data)
    io.emit('delete piece', data)
  })

  client.on('select piece', pieceId => {
    let data = { clientId: client.id, pieceId }
    store.commit('selectPiece', data)
    console.log('user ' + client.id + ' selected piece ' + pieceId)
    client.broadcast.emit('select piece', data)
  })

  client.on('dirtyState', dirtyState => {
    console.log("DIRTY STATE", dirtyState)
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
    if (parseChatCommands(client, message)) {}
    else {
      store.commit('addMessage', data)
      io.emit('message', data)
    }
  })

  setInterval(() => store.commit('sendDirtyState', io), 100)
})

