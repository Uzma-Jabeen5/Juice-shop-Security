const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const hashPassword = async (req, res, next) => {
  const { password } = req.body

  // Validate password strength
  if (password) {
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters' 
      })
    }

    // Hash the password
    req.body.hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    console.log('Password hashed successfully')
  }

  next()
}

module.exports = hashPassword
