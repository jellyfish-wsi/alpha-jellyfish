var express = require('express');
var router = express.Router();
// Get configured passport from lib/google-auth.js
var passport = require('../lib/google-auth').getConfiguredPassport();

router.get('/', function(req, res, next) {
  res.render('login', { page_name: 'Login' });
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/flight');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/auth');
});

module.exports = router;
