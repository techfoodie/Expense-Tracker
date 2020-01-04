const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('fetching all incomes');//authentication check
    //fetch and send incomes of that users
})

router.put('/:id', function(req, res){
    res.send('updating an income');//authentication check
    //edit that particular income
    //display the changes on the webpage
})

router.post('/', function(req, res){
    res.send('inserting an income');//authentication check
    //add income in database
    //display changes in the webpage
})

router.get('/charts', function(req, res){
    res.send('Income chart');//get the 2 dates from req object and send categorized sum of incomes of that user
})    

router.get('/:id', function(req, res){
    res.send('fetching an income');//authentication check
    //fetch and send that particular income
})

module.exports = router;