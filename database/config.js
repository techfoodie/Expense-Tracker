var mysql= require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'somya',
    password: 'somya',
    database: 'example'
})

module.exports = connection;