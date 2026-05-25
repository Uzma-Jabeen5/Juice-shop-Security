const jwt = require('jsonwebtoken')
const SECRET_KEY = 'juice-shop-secret-key-2026'

const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email: email },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ 
      error: 'No token provided' 
    })
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ 
      error: 'Invalid or expired token' 
    })
  }
}

module.exports = { generateToken, verifyToken }
