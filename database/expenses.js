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

DB.getAllExpenses = function(id, cb){  
    console.log("fetching all expenses of this user") //id is the user id from req.user.id
    var query = "SELECT details, amount, e_id, e_date, c_name as category from expenses e, category c where e.c_id = c.c_id and id=?;"
    connection.query(query, [id], function(error, results, fields){
        console.log(JSON.stringify(results));
        console.log(JSON.stringify(error));
        cb(error, results)
    })

}

DB.getExpense = function(id, eid, cb){
    console.log("fetching a particular expense");               //fetch a particular expense of that user
    var query = "SELECT details, amount, e_date, c_name as category from expenses e, category c where e.c_id = c.c_id and id=? and e_id = ?";
    connection.query(query, [id, eid], function(error, results, fields){
        console.log(JSON.stringify(results));
        console.log(JSON.stringify(error))
        cb(error, results)
    })
}

DB.deleteExpense = function(id, eid, cb){
    console.log("deleting an expense");         //delete a particular expense of that user
    var query = "DELETE from expenses where id = ? and e_id = ?";
    connection.query(query, [id, eid], function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
        cb(error, results)
    })

}

DB.updateExpense = function(id, eid, details, date, amount, c_name, cb){
    DB.getCategorybyName(c_name, function(data){
    console.log("updating an expense");
    var cid = data;
    console.log("value in 2 is:" + cid);
    var query = "UPDATE expenses set ? where id = ? and e_id = ?";
    var updatedExpense = new Expense(amount, details, date, cid, id, eid);
    console.log()
    connection.query(query, [updatedExpense, id, eid], function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
        console.log(JSON.stringify(fields)) 
        //cb(error)  
    })
})
}

DB.addExpense = function(id, eid, details, date, amount, c_name, cb){
    DB.getCategorybyName(c_name, function(data){
        var cid = data;
        var query = "INSERT INTO expenses  SET ?";
        var expenseToAdd = new Expense(amount, details, date, cid, id, eid)
        connection.query(query, [expenseToAdd], function(error, results, fields){
            console.log(JSON.stringify(results))
            console.log(JSON.stringify(error))
           // cb(error)
        })
    })
}

DB.getExpenseChartData = function(id, date_beg, date_end, cb){
    var query = "select sum(amount) as sum, c_name as category from expenses e, category c where e.c_id = c.c_id and id = ? and e_date between ? and ? group by(e.c_id)"
    connection.query(query, [id, date_beg, date_end], function(error, results, fields){
        console.log(JSON.stringify(results))
        console.log(JSON.stringify(error))
        var total = results.map(x=> x.sum);
        var category = results.map(y=>y.category)
        console.log(total)
        console.log(category)
        //cb(error, total, category)
    })
}

DB.getChartData(2)
//DB.addExpense(1,null, "music system", "2019-02-19", 34560, "electronics");
//DB.getExpense(2,2);
//DB.getCategorybyName("health");

function Expense(amount, details, date, cid, id, eid){
    this.amount = amount; 
    this.details = details;
    this.e_date = date;
    this.c_id = cid;
    this.id = id;
    this.e_id = eid;
    console.log("cid inside 3 "+ cid);
}