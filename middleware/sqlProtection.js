const sqlPatterns = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b)/gi,
  /(--|#|\/\*|\*\/)/g,
  /(\bOR\b\s+\d+\s*=\s*\d+)/gi
];

const sqlProtection = (req, res, next) => {
  const body = JSON.stringify(req.body);
  const detected = sqlPatterns.some(p => p.test(body));
  if (detected) {
    return res.status(400).json({ error: 'Invalid input detected' });
  }
  next();
};

module.exports = sqlProtection;
