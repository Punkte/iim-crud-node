import jwt from 'jsonwebtoken'

const verify = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.status(400).json({ error: 'No token provided' })
  } else {
    const bearerToken = authorization.split(' ')[1]
    try {
      const verify = jwt.verify(bearerToken, 'jwtsecret')
      verify && next()
    } catch (error) {
      res.status(400).json({ error: 'Invalid token' })
    }
  }
}

export default verify
