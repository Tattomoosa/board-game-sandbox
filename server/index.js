import _express from 'express'
import _http from 'http'
import _socketio from 'socket.io'
import shared from '../shared/dist/index.js'

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

io.on('connection', client => {
  // client.id = _uuid()
  // Name is changeable
  client.name = client.id

  console.log('user ' + client.id + ' connected')
  // give client its id

  client.on('ready', () => {
    client.to(client.id).emit('init client', {
      id: client.id,
    })
  })

  client.on('disconnect', function() {
    console.log('user ' + client.id + ' disconnected')
  })

  client.on('edited', data => {
    client.broadcast.emit('edited', data)
    console.log('updat1')
    // shared()
  })

  client.on('send message', (data) => {
    let { message } = data
    if (message.startsWith(":"))
    {
      if (message.startsWith(":setname "))
      {
        let previousName = client.name
        client.name = message.slice(9)
        console.log(previousName + " is now known as " + client.name)
        io.to(client.id).emit('namechange', { name: client.name })
      }
    } else {
      io.emit('message', data)
      console.log(data.message)
    }
  })

    /*
  client.on('chat message', function(message) {
    console.log('message: ' + message)
    if (message.startsWith("\\setname ")) {
      let previous_name = client.name
      client.name = message.slice(9)
      io.emit('chat message', '// ' + previous_name + ' has changed their name to ' + client.name)
    }
    else
      io.emit('chat message', '[' + client.name +'] : ' + message)
  })

  client.on('on drag', function(draggable) {
    console.log('draggable\nid: ' + draggable.id + '\n x: ' + draggable.x + ', y: ' + draggable.y)
    io.emit('on drag', draggable)
  })
  */

})

http.listen(PORT, function() {
  console.log('listening on *: ' + PORT)
})
