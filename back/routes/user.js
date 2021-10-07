import { Router } from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.get('/', async function(req, res) {
  const users = await User.find({})
  return res.json(users)
})

// get user info
router.get('/profile', async function(req, res) {
  try {
    const { authorization } = req.headers
    const bearerToken = authorization.split(' ')[1]
    const { id } = jwt.decode(bearerToken)
    const user = await User.findById(id)
    return res.json(user)
  } catch(e) {
    return res.status(401).json({ error: 'unauthorized' })
  }
})


export default router