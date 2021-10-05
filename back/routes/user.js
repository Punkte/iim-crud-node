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
  const { authorization } = req.headers
  const bearerToken = authorization.split(' ')[1]
  
  console.log(jwt.decode(bearerToken))
  return res.json({ bonsoir: "lol" })
})


export default router