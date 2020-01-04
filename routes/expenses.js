const express = require('express');
const router = express.Router();

router.get('/',
    login.ensureLoggedIn(), 
    function(req, res){
    db.getAllExpenses(req.user.id, function(err, data){
    res.render('expenses', {expenses: data})//check the authentication
    })//if true, then fetch that user's expenses and send them
})


router.put('/:id', function(req, res){
    db.updateExpense(req.body.id, null, req.body.details, req.body.date, req.body.amount, req.body.c_name, function(err, data){
    res.render('expenses', {expenses: data})//authentication check
    })//edit that particular expense
    //display changes in the webpage
})

router.post('/', function(req, res){
    db.addExpenses(req.body.id, null, req.body.details, req.body.date, req.body.amount, req.body.c_name, function(err, data){
    res.render('expenses', {expenses: data})//authentication check
    //add expense in database
    })//display changes in the webpage
})

router.get('/charts', function(req, res){
    res.render('expense_chart');//get the 2 dates from req object and send the categorized sum of expenses of that user
})

router.delete()

//router.get('/:id', function(req, res){
//    res.send('fetching an expense')//authentication check fetch and send that particular expense
//})


module.exports = router;
