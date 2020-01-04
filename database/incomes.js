var connection = require('./config.js');
connection.connect(function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('successfully connected ' )
})

var DB = {}

DB.getCategorybyName = function(cname, cb){
    var query = "SELECT c_id from category where c_name = ?"
    connection.query(query, [cname], function(error, results, fields){
        var cid = results.map(a=> a.c_id);
        cb(cid);

    })
}

DB.getAllIncomes = function(id, cb){  
    console.log("fetching all incomes of this user") //id is the user id from req.user.id
    var query = "SELECT i_id, details, amount, i_date, c_name as category from incomes i, category c where i.c_id = c.c_id and id=?;"
    connection.query(query, [id], function(error, results, fields){
        console.log(JSON.stringify(results));
        console.log(JSON.stringify(error));
    })

}

DB.getIncome = function(id, iid, cb){
    console.log("fetching a particular income");               //fetch a particular income of that user
    var query = "SELECT details, amount, i_date, c_name as category from incomes i, category c where i.c_id = c.c_id and id=? and i_id = ?";
    connection.query(query, [id, iid], function(error, results, fields){
        console.log(JSON.stringify(results));
        console.log(JSON.stringify(error))
    })
}

DB.deleteIncome = function(id, iid, cb){
    console.log("deleting an income");         //delete a particular income of that user
    var query = "DELETE from incomes where id = ? and i_id = ?";
    connection.query(query, [id, iid], function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
    })

}

DB.updateIncome = function(id, iid, details, date, amount, c_name, cb){
    
    DB.getCategorybyName(c_name, function(data){ 
    console.log("updating an income");
    var cid = data;
    var query = "UPDATE incomes set ? where id = ? and i_id = ?";
    var updatedIncome = new Income(amount, details, date, cid);
    connection.query(query, [updatedIncome, id, iid], function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
    })
})
}

//DB.updateIncome(1,1, "college extra curricular fees", "2016-12-14", 3456, "education");
//DB.getIncome(2,2);
//DB.getCategorybyName("health");
//DB.getAllIncomes(6);
//DB.getIncome(8,3);
DB.updateIncome(8,3, "investment2", "2020-12-12", 76543, "salary");
//DB.deleteIncome(2,2);

function Income(amount, details, date, c_id){
    this.amount = amount; 
    this.details = details;
    this.i_date = date;
    this.c_id = c_id;
    console.log("cid inside func: "+ c_id);
}