// load and configure socket.io & express
var express = require('express'),
  app = express(),
  http = require('http'),
  sockjs = require('sockjs'),
  socketServer = sockjs.createServer(),
  connections = [];

function sendAll(message)
{
  for(var i=0;i<connections.length;i++)
    {
      connections[i].write(message);
    }
}


socketServer.on('connection', function(conn) {
  console.log('Got connection');
  connections.push(conn);
  conn.on('data', function(message) {
    // broadcast data to all clients
    console.log(message);
    sendAll(message);
  });
  conn.on('close', function() {
    connections.splice(connections.indexOf(conn), 1); // remove the connection
    console.log('Lost connection');
  });
});



var httpServer = http.createServer();
socketServer.installHandlers(httpServer, {prefix:'/yo'});
httpServer.listen(5555, '127.0.0.1');