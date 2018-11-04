import { store, app, http, io } from './init'

let commands = {
  // \setprop color blue
  // changes a prop on a piece
  setprop(args, client) {
    console.log('client is: ' + client.id)
    let selectedPiece = store.getters.pieceSelectedByUser(client.id)
    let prop = args[0]
    let value = args[1]
    if (selectedPiece && selectedPiece[prop])
    {
      store.commit('setPiece', {...selectedPiece, [prop]: value})
      io.emit('edited', {...selectedPiece, [prop]: value })
      let message = store.state.users[client.id].name
      message += "has set '" + prop + "' of '"
        + selectedPiece.id +"' to '" + value + "'"
      io.emit('message', { message })
    }
    else
      io.emit('message', { message: "Property '" + prop + "' does not exist"})
  },
  // \setname o2
  // changes client's username
  setname(args, client) {
	  let name = args[0]
    let previousName = store.state.users[client.id].name
		store.commit('changeUsername', {name, clientId: client.id})
    let message = "'" + previousName + "' is now known as '" + name + "'"
    io.emit('message', { message })
		store.commit('addMessage', { message })
    commands.resetclient()
  },
  // \clearchathistory
  clearchathistory() {
    store.commit('clearChat')
    commands.resetclient()
  },
  // \test
  // also prints any arguments
  test(args) {
    let message = 'test passed! '
    message += 'args = [\n'
    for (let i=0; i < args.length; i++)
      message += '  ' + i + ': ' + args[i] + '\n'
    message += ']'
		store.commit('addMessage', { message })
    io.emit('message', { message })
  },
  listcommands(args) {
    let message = 'COMMANDS:\n'
    for (let command of Object.keys(commands))
      message += command + '\n'
		store.commit('addMessage', { message })
    io.emit('message', { message })
  },
  resetclient() {
		io.emit('reset client',
			{
				pieces: store.state.pieces,
				users: store.state.users,
				messages: store.state.messages
			}
		)
  }
}

function parseCommands(client, message) {
  let args = []
  let command = ''
  console.log('parsing command: ' + message)

  if (message[0] != '\\') return false

  message = message.substring(1)
  args = message.split(' ')
  command = args.shift()

  if (commands[command])
    commands[command](args, client)
  else
    return false

  return true
}

export default parseCommands