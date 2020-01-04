const Express= require('express'); // ES6 would be: import Express from 'express'
const app = Express();
const expressLayouts = require('express-ejs-layouts');
var db = require('./database');
var index = require('./routes/index')
var expenses = require('./routes/expenses')
var incomes = require('./routes/incomes')
var users = require('./routes/users')

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//ROUTES
app.use('/', index);
app.use('/expenses', expenses);
app.use('/incomes', incomes);
app.use('/users', users);





app.listen(5000);



//function add(a, b, cb){
  //  setTimeout(function(){
  //      var ans = a + b; //async
  //      cb(ans)
  //  }, 100)
    
//}


//function driver(){
  //  var d;
  //  add(5,6, function(data) {
 //       console.log("this is data from cb:" + data)
 //       d = data
 //   })
   // console.log("This is value captured in d: " + d);
//}
//driver()