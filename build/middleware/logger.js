const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`
    })
  ),
  transports: [
    // Log to console
    new winston.transports.Console(),
    // Log to file
    new winston.transports.File({ 
      filename: 'security.log' 
    })
  ]
})

// Test log entries
logger.info('Application started')
logger.warn('Suspicious login attempt detected')
logger.error('SQL Injection attempt blocked')

module.exports = logger
