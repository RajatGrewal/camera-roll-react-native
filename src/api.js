var _ = require('lodash');
var rootURL = "http://api.openweathermap.org/data/2.5/weather?";
var apiKey = "APPID=b31b2ecaaeb7825b9424b754e6b1012e";
var kelvinToC = function(kelvin){
  return Math.round(kelvin-273.15) + ' ˚C'
}
module.exports = function(latitude,longitude){

  var url = `${rootURL}&lat=${latitude}&lon=${longitude}&${apiKey}`;
  console.log("Hitting URL : " + url);
  return(
    fetch(url)
      .then(function(response){
        console.log("Response Received");
        return (response.json());
      })
      .catch(function(err){
        console.log(err);
      })
      .then(function(json){
        console.log(json);
        return {
         city: json.name,
         temperature: kelvinToC(json.main.temp),
         description: _.capitalize(json.weather[0].description)
       }
      })
  )

}
