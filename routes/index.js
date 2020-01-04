const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('Welcome');//display the home page with login and signup buttons
})

router.get('/logout', function(req, res){
    req.logout(); // what does it do??
    res.redirect('/');
  });

module.exports = router;