const request = require("request");

const getWeather = (data, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=660474e862ba9dd8841ec9c4f6a9eb50&query=${data.latitude},${data.longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to get the weather data!", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feels_like: body.current.feelslike,
        weather_description: body.current.weather_descriptions[0],
        precipitation: body.current.precip,
      });
    }
  });
};

module.exports = getWeather;
