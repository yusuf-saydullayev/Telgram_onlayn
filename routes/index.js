var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Telegram' });
});
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'Welcome to chat' });
});

module.exports = router;
