const express = require('express');
const { getWeather } = require('../controllers/weather.controller');
const { weatherValidationRules, validate } = require('../middleware/validators');

const router = express.Router();

// GET /weather?address=location
router.get('/', weatherValidationRules, validate, getWeather);

module.exports = router;
