var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('adam', { title: 'Adam Bellioum' });
});

module.exports = router;
