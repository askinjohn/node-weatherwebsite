const { query, validationResult } = require('express-validator');

/**
 * Validation rules for weather endpoint
 */
const weatherValidationRules = [
  query('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Address must be between 2 and 200 characters'),
];

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return res.status(400).json({ error: firstError.msg });
  }
  next();
};

module.exports = {
  weatherValidationRules,
  validate,
};
