const http = require('https');
const { findWeather } = require('./weather');

const findGeolocationByPlace= (mapboxUrl,weatherResponse) => http.request(mapboxUrl,(response)=>{

    response.on('data',(chunk)=>{
        const data=JSON.parse(chunk);
        const placename = data.features[0].place_name;
        console.log(placename);
        const lat=data.features[0].center[1];
        const long = data.features[0].center[0];
        findWeatherByLocation(lat,long,weatherResponse,null,placename,false);
    });

    response.on('error',(e)=>{
        findWeatherByLocation('','',null,e,null,false)
    })

}).end();

const findWeatherByLocation = (lat,long,weatherResponse,error,placename,isByLocation) =>{
        if(error===null){
        var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d2cf92363d48ca40809207d5932f5fa5`;
        findWeather(weatherUrl,null,weatherResponse,placename,isByLocation);
        }
        else
        findWeather(null,error,weatherResponse,placename,isByLocation);
}

module.exports = {
    findWeatherByLocation,
    findGeolocationByPlace
}