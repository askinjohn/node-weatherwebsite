const { geocode } = require('../services/geocode.service');
const { getForecast } = require('../services/weather.service');

/**
 * Get weather for a given address
 */
const getWeather = async (req, res, next) => {
  try {
    const { address } = req.query;

    // Geocode the address to get coordinates
    const { location, latitude, longitude } = await geocode(address);

    // Get weather forecast for the coordinates
    const forecast = await getForecast(latitude, longitude);

    // Send successful response
    res.json({
      location,
      forecast,
      address,
    });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
};

module.exports = {
  getWeather,
};
