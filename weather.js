const http = require('https');

const findWeather = (weatherUrl,error,weatherResponse,placename,isByLocation) => http.request(weatherUrl,(response)=> {
        
        response.on('data',(chunk)=>{
            const data = JSON.parse(chunk);
            if(isByLocation){
                const weather = {
                    weather:data.weather[0].description,
                    coords:data.coord
                };
                weatherResponse(weather,null,placename);
            }
            else{
                const weather = data.weather[0].description;
                weatherResponse(weather,null,placename);
            }
           
        })

        response.on('error',(e)=>{
            weatherResponse(null,{e,error,placename});
        })
      
}).end();

module.exports = {
    findWeather
}