var   mongo = require('mongodb').MongoClient,
      client = require('socket.io').listen(4000).sockets;

mongo.connect('mongodb://127.0.0.1/chat', function(err, db) {

  if(err) throw err;

  client.on('connection', function(socket) {

    socket.on('input', function(data) {
      console.log(data);
    });
  });

});

