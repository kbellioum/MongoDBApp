var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('karim', { title: 'Karim Bellioum' });
});

module.exports = router;
