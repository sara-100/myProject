var express = require('express');
var router = express.Router();


const msg = [
  {name: 'sari', text: 'hi'}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(msg);
});

module.exports = router;
