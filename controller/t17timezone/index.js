const cityData = require('./city_timezone')

const timeZone = function(req, res, next) {  
  res.render('./t17timezone/index');
}

const fetchCityData = (req, res)=>{  
  return res.send(cityData);
}

module.exports = {
  timeZone,fetchCityData
}
