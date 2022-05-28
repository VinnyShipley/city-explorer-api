'use strict';


//Require. Servers need to be told to require then use this
//instantiates express on the page
const express = require('express');

const axios = require('axios');

//Bringing in the data from the LOCAL weather.json file
// let weatherData = require('./data/weather.json');

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
console.log('hi line 38');
//pulling info from the browser to display on the font end
app.get('/weather', async (request, response) => {
  let city_name = request.query.city_name;
  try {
    let weatherApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?days=5&city=${city_name}&key=${process.env.WEATHER_BIT_API_KEY}`;
    let weatherApiUrlInfo = await axios.get(weatherApiUrl);
    let pulledData = weatherApiUrlInfo.data.data;
    let dataToSend = pulledData.map(city => new Forecast(city));
    console.log('hi');
    response.send(dataToSend);
  } catch (error) {console.log('error');}
});

app.get('/movies', async (req, res) => {
  let searchedCity = req.query.city_name;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchedCity}`;
  let movieInfo = await axios.get(url);
  let dataToSend = movieInfo.data.results.map( movie => new Movie (movie));
  res.send(dataToSend);
});

//CatchAll * route, 404
app.get('*', (request, response) => {
  response.send('The thing you are looking for isn\'t here');
});

//Error


//Classes
class Forecast {
  constructor(city) {
    this.date = city.valid_date;
    this.description = city.weather.description;
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.description = movie.overview;
    this.release = movie.release_date;
    this.score = movie.vote_average;

  }
}


//Listen
//starts the server. Listen is a method natively available on express. Needs to args: port value which is defined as PORT which is pulled from the .env file and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
