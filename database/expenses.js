var connection = require('./config.js');
connection.connect(function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('successfully connected ' )
})

var DB = {}

DB.getCategorybyName = function(cname){
    var query = "SELECT c_id from category where c_name = ?"
    connection.query(query, [cname], function(error, results, fields){
        var cid = results.map(a=> a.c_id);
        console.log("value of cid is:" + cid)
        return (cid);
        

    })
}

DB.getAllExpenses = function(id, cb){  
    console.log("fetching all expenses of this user") //id is the user id from req.user.id
    var query = "SELECT details, amount, e_date, c_name as category from expenses e, category c where e.c_id = c.c_id and id=?;"
    connection.query(query, [id], function(error, results, fields){
        console.log(JSON.stringify(results));
        console.log(JSON.stringify(error));
    })

}

DB.getExpense = function(id, eid, cb){
    console.log("fetching a particular expense");               //fetch a particular expense of that user
    var query = "SELECT details, amount, e_date, c_name as category from expenses e, category c where e.c_id = c.c_id and id=? and e_id = ?";
    connection.query(query, [id, eid], function(error, results, fields){
        console.log(JSON.stringify(results));
        console.log(JSON.stringify(error))
    })
}

DB.deleteExpense = function(id, eid, cb){
    console.log("deleting an expense");         //delete a particular expense of that user
    var query = "DELETE from expenses where id = ? and e_id = ?";
    connection.query(query, [id, eid], function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
    })

}

DB.updateExpense = function(id, eid, details, date, amount, c_name, cb){
    console.log("updating an expense");
   // var cid = DB.getCategorybyName(c_name);
  //  console.log("value in 2 is:" + cid);
    var query = "UPDATE expenses set ? where id = ? and e_id = ?";
    var updatedExpense = new Expense(amount, details, date, DB.getCategorybyName(c_name));
    console.log()
    connection.query(query, [updatedExpense, id, eid], function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
    })
}

DB.updateExpense(1,1, "college extra curricular fees", "2016-12-14", 3456, "education");
//DB.getExpense(2,2);
//DB.getCategorybyName("health");

function Expense(amount, details, date, cid){
    this.amount = amount; 
    this.details = details;
    this.e_date = date;
    this.c_id = cid;
    console.log("cid inside 3 "+ cid);
}