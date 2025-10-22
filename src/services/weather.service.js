const axios = require('axios');
const config = require('../config/environment');

/**
 * Get weather forecast for given coordinates
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<string>} Weather forecast description
 */
const getForecast = async (latitude, longitude) => {
  if (!latitude || !longitude) {
    throw new Error('Latitude and longitude are required');
  }

  if (!config.openWeatherApiKey) {
    throw new Error('OpenWeather API key is not configured');
  }

  const url = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const response = await axios.get(url, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: config.openWeatherApiKey,
        units: 'metric', // Use metric units (Celsius)
      },
    });

    const { data } = response;

    // Format the weather data
    const summary = data.weather[0].description;
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const forecast =
      `Weather Report: ${summary}. ` +
      `Temperature: ${temperature}�C (feels like ${feelsLike}�C). ` +
      `Humidity: ${humidity}%. ` +
      `Wind Speed: ${windSpeed} m/s.`;

    return forecast;
  } catch (error) {
    if (error.response) {
      // API responded with error
      if (error.response.status === 401) {
        throw new Error('Invalid OpenWeather API key. Please check your configuration');
      }
      throw new Error(`Weather API error: ${error.response.data.message || error.message}`);
    } else if (error.request) {
      // No response received
      throw new Error('Cannot connect to weather service. Please check your internet connection');
    } else {
      // Other errors
      throw error;
    }
  }
};

module.exports = { getForecast };
