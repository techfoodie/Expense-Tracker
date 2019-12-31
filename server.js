const Express= require('express'); // ES6 would be: import Express from 'express'
const app = Express();
var db = require('./database');

app.get('/', function(req, res){
    //display the home page with login and signup buttons
})

app.get('/expenses', function(req, res){
    //check the authentication
    //if true, then fetch that user's expenses and send them
})

app.get('/expenses/:id', function(req, res){
    //authentication check
    //fetch and send that particular expense
})

app.put('/expenses/:id', function(req, res){
    //authentication check
    //edit that particular expense
    //display changes in the webpage
})

app.post('/expenses', function(req, res){
    //authentication check
    //add expense in database
    //display changes in the webpage
})


app.get('/incomes', function(req, res){
    //authentication check
    //fetch and send incomes of that users
})

app.get('/incomes/:id', function(req, res){
    //authentication check
    //fetch and send that particular income
})

app.put('/incomes/:id', function(req, res){
    //authentication check
    //edit that particular income
    //display the changes on the webpage
})

app.post('/incomes', function(req, res){
    //authentication check
    //add income in database
    //display changes in the webpage
})

app.get('/login', function(req, res){
    //to display login page
})
app.put('/login', function(req, res){
    //authentication check
    //redirect to home page of that user if successful login, else back to login page
})

app.get('/signup', function(req, res){
    //get the signup page
})

app.post('/signup', function(req, res){
    //check whether username is unique or not, if not display appropriate msg
    //if unique, create new user with blank incomes, expenses table and redirect to login page
})

app.get('/expenses/charts', function(req, res){
    //get the 2 dates from req object and send the categorized sum of expenses of that user
})

app.get('/incomes/charts', function(req, res){
    //get the 2 dates from req object and send categorized sum of incomes of that user
})


app.listen(5000);