import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import generateAccessToken from '../helpers/generateAccessToken.js'

const router = express.Router()

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'please provide a username and a password' })
  }
  const userExists = await User.exists({ username })
  let response
  if (userExists) {
    const user = await User.findOne({ username })
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      const token = generateAccessToken({ username: user.username, id: user._id })
      const refreshToken = jwt.sign(
        { username: user.username },
        'jwtsecret',
      )
      response = { payload: { token, refreshToken }, code: 200 }
    } else {
      response = { payload: { error: 'invalid password' }, code: 400 }
    }
  } else {
    response = { payload: { error: 'user not found' }, code: 400 }
  }
  res.status(response.code).json(response.payload)
})

// @route   POST api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body
  if (username && password && email) {
    const passwordHash = await bcrypt.hash(password, 10)
    const exists = await User.exists({ username })
    if (false === exists) {
      const user = new User({
        username,
        password: passwordHash,
        email
      })
      const createdUser = await user.save()
      return res.status(201).json(createdUser)
    } else {
      return res.status(401).json({ error: 'user already exists' })
    }
  }
  return res.status(400).json('an error occured')
})

export default router