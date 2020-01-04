var connection = require('./config.js')
connection.connect(function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('successfully connected ' )
})

var DB = {}

DB.getAllUsers = function(cb){
    console.log("Fetching ALL Users!")
    var query = 'SELECT id, username as Username, email as Email_id, isAdmin FROM users'     //WILL FETCH USERNAME AND EMAIL-ID OF ALL USERS
    connection.query(query, function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
    })
}

DB.getUser = function(id, cb){
    console.log("Fetching details of user")
    var query = 'SELECT username as Username, email as Email_id FROM users where id = ?'     //WILL FETCH USERNAME AND EMAIL-ID OF A PARTICULAR USER
    connection.query(query,[id], function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
    })
}

DB.addUser = function(username, password, email, isAdmin, cb){
    console.log("Adding User with username: " + username)
    var userToAdd = new User(null, username, password, email, isAdmin)          //adds a new user in database. It takes username, email, password and isAdmin as input
    var query = `INSERT INTO users SET ?`
    connection.query(query, [userToAdd],function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
    })
}

DB.deleteUser = function(id, cb){
    console.log("Deleting user with userid: " + id);            //deletes an existing user. Takes user idas input passed as req.user.id
    var query = 'DELETE from users WHERE id = ?';
    connection.query(query, [id], function(error, results, fields){
        console.log(JSON.stringify(results))
    })
}

DB.modifyUser = function(id ,username, password, email, isAdmin, cb){
    console.log("Updating user: " + username);
    var query = "UPDATE users SET ? WHERE username= ?";                             //updates the username, password, email or admin status
    var updatedUser = new User(id, username, password, email, isAdmin);
    connection.query(query, [updatedUser, username], function(error, results, fields){
        console.log(JSON.stringify(results));
        console.log(JSON.stringify(error));
    })
}


//DB.getUser(2);

function User(id, username, password, email, isAdmin){
    this.id=id,
    this.username = username,
    this.password = password,
    this.email = email,
    this.isAdmin = isAdmin
}

module.exports = DB;