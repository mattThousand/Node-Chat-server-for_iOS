var express = require('express'),
  app = express(),
  host =  '127.0.0.1',
  port = process.env.PORT || 5000,
  dgram = require('dgram'),
  server = dgram.createSocket('udp4'),
  CLIENTS = [];

function sendAll(message)
{
for(var i=1;i<CLIENTS.length;i++)
    {
    CLIENTS[i].send(message);
    }
}

server.on('listening', function(){
  var address = server.address();
  console.log('UDP server listening on ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote){
  console.log(remote.address + ':' + remote.port + '-' + message);
});

server.bind(port, host);

