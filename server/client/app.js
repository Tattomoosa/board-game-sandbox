$(function () {
  let socket = io()

  $('form').submit(function() {
    socket.emit('chat message', $('#m').val())
    $('#m').val('')
    return false
  })

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg))
  })

  window.interact('.draggable')
    .draggable({
      onmove: on_drag
  })

  function on_drag (e) {
    let target = e.target,
      id = target.id
      x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)

    socket.emit('on drag', {
      id : id,
      x : x,
      y : y,
    })
  }

  socket.on('on drag', function(draggable) {
    console.log(draggable.id)
    let obj = $('#' + draggable.id)
    obj.css({ transform: 'translate(' + draggable.x + 'px, ' + draggable.y + 'px)' })

    obj = document.getElementById(draggable.id)

    obj.setAttribute('data-x', draggable.x)
    obj.setAttribute('data-y', draggable.y)

  })

})
