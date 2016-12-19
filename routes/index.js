var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', notAuth);

router.get('/login', function (req, res) {
  res.render('login', { title: 'Sign in' });
});

router.post('/login', function (req, res) {
  var user = {
    username: 'admin',
    password: 'admin'
  }
  if (req.body.username === user.username && req.body.password === user.password) {
    req.session.user = user;
    res.redirect('/home');
  } else {
    req.session.error = 'username or password incorrect';
    res.redirect('/login');
  }
});

router.get('/logout', auth);

router.get('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/');
});

router.get('/home', auth);

router.get('/home', function (req, res) {
  res.render('home', { title: 'Home' });
});

function auth(req, res, next) {
  if (!req.session.user) {
    req.session.error = 'Please login first';
    return res.redirect('/login');
  }
  next();
}
function notAuth(req, res, next) {
  if (req.session.user) {
    // req.session.error = 'You have signed in';
    return res.redirect('/home');
  }
  next();
}

module.exports = router;
