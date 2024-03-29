var express = require('express');
var router = express.Router();
const cityData = require('./city_timezone')

/* GET home page. */
router.get('/timeZone', function(req, res, next) {
  
  res.render('./t17timezone/index');
});


router.get('/fetchCityData',(req, res,)=>{
  
  return res.send(cityData);
})



module.exports = router;
