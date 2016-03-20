var mysql = require('db-mysql');

new mysql.Database({
    hostname: 'localhost'
    , user: 'pigeon'
    , password: 'pigeon'
    , database: 'pigeon'
}).connect(function (err) {
    if (err)
        return console.error(err);

})