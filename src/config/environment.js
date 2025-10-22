require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mapboxToken: process.env.MAPBOX_ACCESS_TOKEN,
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
};
