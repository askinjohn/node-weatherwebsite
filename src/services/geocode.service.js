const axios = require('axios');
const config = require('../config/environment');

/**
 * Geocode an address to get coordinates and location name
 * @param {string} address - The address to geocode
 * @returns {Promise<{location: string, latitude: number, longitude: number}>}
 */
const geocode = async (address) => {
  if (!address) {
    throw new Error('Address is required');
  }

  if (!config.mapboxToken) {
    throw new Error('Mapbox API token is not configured');
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: config.mapboxToken,
        limit: 1,
      },
    });

    if (!response.data.features || response.data.features.length === 0) {
      throw new Error('Address not found or invalid');
    }

    const feature = response.data.features[0];

    return {
      location: feature.place_name,
      latitude: feature.center[1],
      longitude: feature.center[0],
    };
  } catch (error) {
    if (error.response) {
      // API responded with error
      throw new Error(`Geocoding API error: ${error.response.data.message || error.message}`);
    } else if (error.request) {
      // No response received
      throw new Error('Cannot connect to geocoding service. Please check your internet connection');
    } else {
      // Other errors
      throw error;
    }
  }
};

module.exports = { geocode };
