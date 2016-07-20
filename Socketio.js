/**
 * Created by Erica on 7/9/2016.
 */

var Room = require('Room.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sodium = require('sodium');

var rooms;

io.on('connection',function(socket) {

    socket.on('hostRoom', function(roomData){
        console.log(roomData);
        var newRoom = new Room();
        newRoom.constructor(roomData.player1, roomData.player2, 'id', new sodium.Box());
        rooms['id'] = newRoom;
        socket.join('id');
    });

    socket.on('message', function(message) {
        console.log(message);
        io.emit('message',message);
    });
});

http.listen(8000,function (socket) {
    console.log("Example app listening at http://localhost:8000");
});