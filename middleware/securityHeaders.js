const helmet = require('helmet');

const securityHeaders = helmet({

  // HSTS — Force HTTPS
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },

  // CSP — Prevent XSS & Script Injection
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'"],
      styleSrc:    ["'self'"],
      imgSrc:      ["'self'", "data:", "blob:"],
      connectSrc:  ["'self'"],
      fontSrc:     ["'self'"],
      objectSrc:   ["'none'"],
      frameSrc:    ["'none'"],
      upgradeInsecureRequests: [],
    }
  });app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('Date');           // ← Hides timestamp
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

  
module.exports = securityHeaders;
