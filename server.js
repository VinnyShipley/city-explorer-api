'use strict';


//Require. Servers need to be told to require then use this
//instantiates express on the page
const express = require('express');

//Bringing in the data from the weather.json file
let weatherData = require('./data/weather.json');

//instantiates dotenv on the page
require('dotenv').config();

// instantiates cors
const cors = require('cors');

//Use. Once acquired, use it. This is where the required gets a file name by way of being put in a variable



//bringing the ability to use express into the page
const app = express();

//middleware
app.use(cors());
//defining the port location on the page
const PORT = process.env.PORT || 3002;


//Routes. The path reieved from the URL
//app.get takes in two args: URL in quotes, and callback function
//Basic default route
app.get('/', (request, response) => {
  response.send(`This is the ${PORT} page`);
});

//pulling info from the browser to display on the font end
app.get('/weather', (request, response) => {
  let cityFromRequest = request.query.city_name;
  let latFromRequest = request.query.lat;
  let lonFromRequest = request.query.lon;
  let selectedCity = weatherData.find((city) => city.city_name.toLowerCase() === cityFromRequest.toLowerCase());
  // let selectedLon = weatherData.find((lon) => lon.lon === lonFromRequest);
  // let selectedLat = weatherData.find((lat) => lat.lat === latFromRequest);
  // let sentData = [selectedLon, selectedCity, selectedLat];
  let dataToSend =  selectedCity.data.map(city => new Forecast(city));
  response.send(dataToSend);
});


//CatchAll * route, 404
app.get('*', (request, response) => {
  response.send('The thing you are looking for isn\'t here');
});

//Error


//Classes
class Forecast {
  constructor(barf){
    this.date = barf.valid_date;
    this.description = barf.weather.description;
    this.lat = barf.lat;
    this.lon = barf.lon;
  }
}


//Listen
//starts the server. Listen is a method natively available on express. Needs to args: port value(which is defined as PORT which is pulled from the .env file) and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

