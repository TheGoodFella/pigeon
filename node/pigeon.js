var mysql = require('mysql');

var dataBase = mysql.createConnection({
  host: 'localhost',
  user: 'pigeon',
  password: 'pigeon',
  database: 'PIGEON'
});

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    port: 6969
  });

wss.on('connection', function connection(ws) {
  console.log('Connection from: ' + ws._socket.remoteAddress + ':' + ws._socket.remotePort);

  ws.on('message', function(data) {
    console.log(ws._socket.remoteAddress + ':' + ws._socket.remotePort + ': ' + data);
    var message = JSON.parse(data);
    message.data = message.data;

    if (message.cat == "query") {
      console.log("Querying...");
      dataBase.query(message.data, function(err, rows) {
        if (err) ws.send(err);
        ws.send(JSON.stringify({
          cat: message.cat,
          data: JSON.stringify(rows)
        }));
      });
    }
  });

  ws.on('close', function close() {
    console.log(ws._socket.remoteAddress + ': ' + ws._socket.remotePort + 'disconnected.');
  });
});

dataBase.connect(function(err) {
  if (err)
    return console.error(err);
  console.log('Connected to DB.');
});

/*
dataBase.end(function () {
    console.log('Disconnected from DB.');
})*/
