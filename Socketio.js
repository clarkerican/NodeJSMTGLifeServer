/**
 * Created by Erica on 7/9/2016.
 */

var Room = require('./Room');
var Player = require('./Player');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sodium = require('sodium');

var rooms = [];
var players = [];

io.on('connection',function(socket) {
console.log("connection");
socket.emit("connection");

    socket.on('connected', function(data){
        console.log("connected");
        players[data.playerName] = new Player();
        players[data.playerName].constructor(data.playerName, socket);
    });

    socket.on('setupRoom', function(roomData){
        console.log("setupRoom " + roomData);

        var roomId = sodium.Random.rand();

        var newRoom = new Room();
        newRoom.constructor(roomData.player1, roomData.player2, roomId, new sodium.Box());
        rooms[roomId] = newRoom;
        var player2 = roomData.player2;
        if(players[player2]){
            players[player2].socket.join(roomId);
        }
        socket.join(roomId);
        console.log(roomId);
        socket.to(roomId).emit('roomId', { roomId: roomId });
        socket.emit('roomId', { roomId: roomId })
    });

    socket.on('message', function(message) {
        //Store the rooms current info in the room object
        console.log(rooms);
        console.log(message.roomId);
        //rooms[message.roomId].player1 = message.player1;
        //rooms[message.roomId].player2 = message.player2;

        console.log(rooms[message.roomId]);

        socket.to(message.roomId).emit('message',message);
        socket.emit('message', message);
    });
});

http.listen(8000,function (socket) {
    console.log("Example app listening at http://localhost:8000");
});