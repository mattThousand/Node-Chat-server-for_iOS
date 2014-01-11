// load and configure socket.io & express
var express = require('express'),
  app = express(),
  ipaddress = '127.0.0.1',
  port = process.env.PORT || 5000,
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({host:ipaddress, port:port}),
  CLIENTS = [];

function sendAll(message)
{
for(var i=1;i<CLIENTS.length;i++)
    {
    CLIENTS[i].send("Message:"+ message);
    }
}

// log open and close events
wss.on('open', function() {
    console.log('connected');
    // ws.send(Date.now().toString(), {mask: true});
});
wss.on('close', function() {
    console.log('disconnected');
});
   
// use like this:
wss.on('connection', function(ws) {
  CLIENTS.push(ws);
  console.log("yo, " + CLIENTS.length + " user(s) are now connected");
  ws.on('message', function(data) {

    // broadcast data to all clients
    console.log("we gots datas!!!");
    sendAll(data);
  });
});


app.get('/images/image.jpeg', function (req, res) {
  res.set('Content-Type', 'image/jpeg');
  // convert the base64 text into a string that the node Buffer object understands
  // and send the composed binary image data to the client
  res.send(new Buffer(lastImage.replace(/^data:image\/jpeg;base64,/,""), 'base64'));
});


console.log("listening on port: " + port);









