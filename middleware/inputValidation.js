const validator = require('validator')

const validateInput = (req, res, next) => {
  const { email } = req.body

  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ 
      error: 'Invalid email address' 
    })
  }

  if (email) {
    req.body.email = validator.normalizeEmail(email)
  }

  next()
}

module.exports = validateInput
