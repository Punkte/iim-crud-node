import express from 'express'

const router = express.Router()

router.get('/', async function(req, res) {
  res.json({
    message: "bonjour",
  })
})
export default router