// load and configure socket.io & express
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// defines the port, the server is running on
// either the snd. argument from the server call
// node server.js :port or falls back to port 8080 if none given
var port = process.env.PORT || 4000;

// holds the base64 text from the last received images
var lastImage = '';

// returns the jpg image ressouce if the url
// image/any_random_valid_ressource_string.jpg is called
app.get('/images/image.jpeg', function (req, res) {
  res.set('Content-Type', 'image/jpeg');
  // convert the base64 text into a string that the node Buffer object understands
  // and send the composed binary image data to the client
  res.send(new Buffer(lastImage.replace(/^data:image\/jpeg;base64,/,""), 'base64'));
});

// get our little server up & running
server.listen(port, function () {
  console.log('Server running on port:' + port);
});

// get our stream up and running
io.sockets.on('connection', function (socket) {
  // if socket data with the 'vs-stream' namespace is received,
  // write the contents to the global ´lastImage´ variable
  socket.on('vs-stream', function (data) {
    if (data.picture !== '') lastImage = data.picture;
  });
});
