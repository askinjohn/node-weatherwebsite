const config = require('../config/environment');

/**
 * Centralized error handling middleware
 */
const errorHandler = (err, req, res, _next) => {
  // Log error for debugging (in production, use a proper logger like winston)
  if (config.nodeEnv === 'development') {
    console.error('Error:', err);
  }

  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  // Send error response
  res.status(statusCode).json({
    error: message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  res.status(404).render('404', {
    errorMessage: 'Page not found',
    title: 'ERROR',
    name: 'Askin',
  });
};

module.exports = { errorHandler, notFoundHandler };
