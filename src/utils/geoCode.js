const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoid2FpdGluZy1oemIiLCJhIjoiY2tyNTRzY2diMXhqaTJxbGRiNGR0bWp1cCJ9.5_VmiDNMvI6R0PlaLDV8KQ";

  request({ url, json: true }, (error, { body }) => {
    const data = body.features[0];
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Please provide a correct location", undefined);
    } else {
      callback(undefined, {
        latitude: data.center[1],
        longitude: data.center[0],
        location: data.place_name,
      });
    }
  });
};

module.exports = geoCode;
