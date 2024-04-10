var express = require('express');
var router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('../config/ensureLoggedIn');
// const User = require('../models/user');
const Post = require('../models/post');


router.get('/', async function(req, res, next) {
  res.render('index', {title:'Petpawrazzi',})
});

router.get('/home',ensureLoggedIn, async function(req,res,next){
  const allPosts = await Post.find({}).populate(['petName', 'author']);
  console.log(allPosts)
  res.render('home', {allPosts})
})

// Google OAuth login route
router.get('/auth/google', passport.authenticate( // passport has an authenticate method which takes two methods
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    prompt:'select_account' // prompts the user to select between accounts if they havd more than one. if they only have one itll prompt for consent
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/home', 
    failureRedirect: '/' 
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() { // logout comes from the request object by passport.
    res.redirect('/'); // change path to your langing page
  });
});

module.exports = router;
