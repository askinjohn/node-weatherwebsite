const express = require('express');
const {
  getHomePage,
  getAboutPage,
  getHelpPage,
  getHelpNotFound,
} = require('../controllers/pages.controller');

const router = express.Router();

// Page routes
router.get('/', getHomePage);
router.get('/about', getAboutPage);
router.get('/help', getHelpPage);
router.get('/help/*', getHelpNotFound);

module.exports = router;
