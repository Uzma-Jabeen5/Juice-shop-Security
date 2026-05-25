const rateLimit = require('express-rate-limit');
const logger = require('./logger');

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Try again after 15 minutes.' },
  handler: (req, res, next, options) => {
    logger.warn(`RATE LIMIT EXCEEDED — IP: ${req.ip} — Route: ${req.path}`);
    res.status(429).json(options.message);
  }
});

// Strict limiter for login route
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Locked for 15 minutes.' },
  handler: (req, res, next, options) => {
    logger.error(`BRUTE-FORCE DETECTED — IP: ${req.ip} — Blocked`);
    res.status(429).json(options.message);
  }
});

module.exports = { apiLimiter, authLimiter };
