const express = require('express');
const router = express.Router();
var db = require('./database');
router.get('/login', function(req, res){
    res.render('login')//to display login page
})
router.post('/login', function(req, res){
    //authentication check
    res.redirect('expenses', { user: req.user });//redirect to expenses page of that user if successful login, else back to login page
})

router.get('/signup', function(req, res){
    res.render('signup')//get the signup page
})

router.post('/signup', function(req, res){
    //check whether username is unique or not, if not display appropriate msg
    db.addUser(req.body.username, req.body.password, req.body.email, 0,  function(err, data){
    res.redirect('login')//if unique, create new user with blank incomes, expenses table and redirect to login page
})
})

router.get('/profile',
  //require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

router.put('/profile',
  //require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    db.modifyUser(req.body.id, req.body.username, req.body.password, req.body.email, 0, function(err, data){
        res.redirect('profile')
    })
  })

  router.delete('/profile', 
  //authentication check
  function(req, res){
      db.deleteUser(req.body.id, function(err, data){
          res.redirect('/')
      })
  }
  )

module.exports = router;