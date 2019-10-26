const request = require('request');

const forecast = (latitude, longitute, callback) => {
  const url =
    'https://api.darksky.net/forecast/0371ce22d567cb0b279944b1363f78e1/' +
    latitude +
    ',' +
    longitute +
    '?units=si';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Weather service', undefined);
    } else if (body.error) {
      callback('Unable to find Location, Please Try Again !!!', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          'It is currently ' +
          body.currently.temperature +
          ' degrees out.There is ' +
          body.currently.precipProbability +
          '% chances of rain'
      );
    }
  });
};

module.exports = forecast;
