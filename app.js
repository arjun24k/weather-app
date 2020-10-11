const { findGeolocation, findWeatherByLocation, findGeolocationByPlace } = require("./location");
const express = require('express');



const app = express();

app.use(express.json());
app.use(express.urlencoded());
//app.use(());

app.get('/', (req, res) => {
    console.log("ddd")
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


app.get('/weather',(req,res)=>{
    
    /* if(!req.query.lat || !req.query.address){
        return res.send({
            error:'Please provide a location'
        })
    } */
    const address = req.query.address;
    if(address){
        const token = 'your token';
        const mapboxUrl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&limit=1`;
        findGeolocationByPlace(mapboxUrl,(weather,error,placename)=>{
            res.send({
                weather,
                error,
                placename
            });
        });
    }

    if(req.query.lat || req.query.long){
        findWeatherByLocation(req.query.lat,req.query.long,(weather,error,placename)=>{
            res.send({
                weather,
                error,
                placename
            });
        },null,null,true);
    }
})
