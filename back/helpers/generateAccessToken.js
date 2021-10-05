import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
  return jwt.sign(user, 'jwtsecret', { expiresIn: '7d' })
}

export default generateAccessToken