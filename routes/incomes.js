const express = require('express');
const router = express.Router();

router.get('/',
    login.ensureLoggedIn(), //check the authentication
    function(req, res){
    db.getAllIncomes(req.user.id, function(err, data){
    res.render('incomes', {incomes: data})
    })//if true, then fetch that user's incomes and send them
})

router.put('/:id', function(req, res){
    db.updateIncome(req.body.id, req.params.id, req.body.details, req.body.date, req.body.amount, req.body.c_name, function(err, data){
    res.render('incomes');//authentication check
    })//edit that particular income
    //display the changes on the webpage
})

router.post('/', function(req, res){
    db.addIncomes(req.body.id, null, req.body.details, req.body.date, req.body.amount, req.body.c_name, function(err, data){
    res.render('incomes');//authentication check
     }) //add income in database
    //display changes in the webpage
})

router.get('/charts', function(req, res){
    db.getIncomeChartData(req.body.id, req.body.date_beg, req.body. date_end, function(err, data){
    res.render('income_chart');//get the 2 dates from req object and send categorized sum of incomes of that user
    })
})    

router.delete('/:id', function(req, res){
    db.deleteIncome(re.body.id, req.params.id, function(err, data){
        res.render('incomes')
    })                                                                                                                                                                                                                                                                                                                                                                                                    
})

module.exports = router;