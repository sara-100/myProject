var express = require('express');
var router = express.Router();
const City = require('../models/city');


router.get('/', async function (req, res, next) {
  try {
    const cities = await City.find({});
    res.send(cities);

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;