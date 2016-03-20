var mysql = require('mysql');

var autobahn = require('autobahn');
var connection = new autobahn.Connection({
    url: 'ws://localhost:9000'
    , realm: 'msgs'
});

var dataBase = mysql.createConnection({
    host: 'localhost'
    , user: 'pigeon'
    , password: 'pigeon'
});

dataBase.connect(function (err) {
    if (err)
        return console.error(err);
    console.log('Connected to DB.');
});

dataBase.end(function () {
    Console.log('Disconnected from DB.');
})