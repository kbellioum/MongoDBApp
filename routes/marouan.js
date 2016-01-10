var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('marouan', { title: 'Marouan Bellioum' });
});

module.exports = router;
