#!/usr/bin/env -S node --experimental-modules

import http from 'http';
import express from 'express';
import socketIo from 'socket.io';

const app = express();

app.use(express.static('public'))

var server = http.createServer(app);
var io = socketIo(server);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
