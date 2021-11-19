// Express and Socket io importation
const express = require('express');
const socketio = require('socket.io');
const path = require('path');


// The main app
const app = express();

const server = require('http').createServer(app)
const io = socketio(server);//instance of socket io 


let port = process.env.PORT || 8000;

// Static middleware
app.use(express.static(path.join(__dirname, 'client')));

// on connection to the web socket

io.on('connection', socket => {
    console.log('there is a new connection')
  //anytime there's is a new connection, a socket object
  // is created for each class with a couple of useful methods

  socket.on('setTimer', timeInSeconds => socket.broadcast.emit('runTimer', timeInSeconds))

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', 'Left the network');
  })
})

server.listen(port, () => console.log(`Server has been started on port ${port}`))
