var mysql = require('mysql');

var dataBase = mysql.createConnection({
    host: 'localhost'
    , user: 'pigeon'
    , password: 'pigeon'
    , database: 'PIGEON'
});

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({
        port: 6969
    });

wss.on('connection', function connection(ws) {
    console.log('Connection from: ' + ws._socket.remoteAddress + ':' + ws._socket.remotePort);

    ws.on('message', function (message) {
        console.log(ws._socket.remoteAddress + ':' + ws._socket.remotePort + ': ' + message);

    });

    ws.on('close', function close() {
        console.log(ws._socket.remoteAddress + ': ' + ws._socket.remotePort + 'disconnected.');
    });
});



dataBase.connect(function (err) {
    if (err)
        return console.error(err);
    console.log('Connected to DB.');
});

dataBase.query('SELECT * FROM USERS', function (err, rows) {
    if (err) throw err;

    console.log('Data received from Db:\n');
    console.log(rows);
});

dataBase.end(function () {
    console.log('Disconnected from DB.');
})