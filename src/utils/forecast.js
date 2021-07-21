const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1e2fae27ba2c080faf03a80e59bb6749&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    // console.log(url);
    data = body.current;

    if (error) {
      callback("Some error occured", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        data.weather_descriptions[0] +
          " : It is currently " +
          data.temperature +
          ". There is " +
          data.precip +
          " chances of rain."
      );
    }
  });
};

module.exports = forecast;
