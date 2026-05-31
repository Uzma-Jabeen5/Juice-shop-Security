const logger = require('./logger');

const VALID_API_KEYS = process.env.API_KEYS
  ? process.env.API_KEYS.split(',')
  : ['juiceshop-dev-key-2024'];

function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    logger.warn(`Missing API key — IP: ${req.ip} — Route: ${req.path}`);
    return res.status(401).json({ error: 'API key required. Include x-api-key header.' });
  }

  if (!VALID_API_KEYS.includes(apiKey)) {
    logger.error(`Invalid API key attempt — IP: ${req.ip} — Key: ${apiKey}`);
    return res.status(403).json({ error: 'Invalid API key.' });
  }

  logger.info(`Valid API key used — IP: ${req.ip} — Route: ${req.path}`);
  next();
}

module.exports = apiKeyAuth;
