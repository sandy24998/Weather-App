const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 5000;

// Define the paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../src/templates/views');
const partialPath = path.join(__dirname, '../src/templates/partials');

//Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialPath);

//Setup  static directory to sreve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sandeep & Sabhya'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Sandeep & Sabhya'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address'
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );

  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'India',
  //   address: req.query.address
  // });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Contact',
    name: 'Sandeep & Sabhya'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sandeep & Sabhya',
    errorMessage: 'Page Not Found !!'
  });
});

app.listen(port, () => {
  console.log('Server is running.... on port ' + port);
});
