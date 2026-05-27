const crypto = require('crypto');

function parseCookies(req) {
  const cookieHeader = req.headers['cookie'] || '';
  const cookies = {};
  cookieHeader.split(';').forEach(pair => {
    const [key, ...val] = pair.trim().split('=');
    if (key) cookies[key.trim()] = val.join('=').trim();
  });
  return cookies;
}

const csrfProtection = (req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    const token = crypto.randomBytes(32).toString('hex');
    res.cookie('csrf-token', token, { httpOnly: false, sameSite: 'Strict' });
    return next();
  }

  const cookies = parseCookies(req);
  const cookieToken = cookies['csrf-token'];
  const headerToken = req.headers['x-csrf-token'];

  if (!cookieToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: 'CSRF token mismatch' });
  }

  next();
};

module.exports = csrfProtection;
