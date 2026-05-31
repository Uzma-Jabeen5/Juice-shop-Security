const logger = require('./logger');

const loginAttempts = {};
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;

function trackFailedLogin(ip) {
  const now = Date.now();
  if (!loginAttempts[ip]) {
    loginAttempts[ip] = { count: 1, firstAttempt: now };
  } else {
    loginAttempts[ip].count++;
  }

  const attempts = loginAttempts[ip].count;
  logger.warn(`FAILED LOGIN attempt #${attempts} from IP: ${ip}`);

  if (attempts >= MAX_ATTEMPTS) {
    logger.error(`ACCOUNT LOCKED — Too many FAILED LOGIN attempts from IP: ${ip}`);
  }

  return attempts;
}

function isBlocked(ip) {
  const record = loginAttempts[ip];
  if (!record) return false;
  if (record.count >= MAX_ATTEMPTS) {
    const elapsed = Date.now() - record.firstAttempt;
    if (elapsed < LOCK_TIME) return true;
    delete loginAttempts[ip];
  }
  return false;
}

function resetAttempts(ip) {
  delete loginAttempts[ip];
  logger.info(`Login attempts reset for IP: ${ip}`);
}

module.exports = { trackFailedLogin, isBlocked, resetAttempts };
