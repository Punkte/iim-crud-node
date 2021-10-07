import { Router } from 'express'
import { io } from '../index.js'
import verify from '../middlewares/verify.js'
import Article from '../models/Article.js'

const router = Router()

// get an article by id
router.get('/:id', async (req, res) => {
  const article = await Article.findOne({ _id: req.params.id })
  return res.json(article)
})

// get a list of latest 10 articles
router.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 })
  return res.json(articles)
})

// get paginated list of articles
router.get('/page/:page', async (req, res) => {
  const page = req.params.page
  const articles = await Article.find().sort({ createdAt: -1 }).skip(page * 10).limit(10)
  return res.json(articles)
})

// create an article
router.post('/', verify,  async (req, res) => {
  try {
    const article = new Article(req.body)
    await article.save()
    io.emit('article', article)
    return res.status(201).json(article)
  } catch(e) {
    return res.status(500).json(e)
  }
})

// update an article
router.put('/:id', verify, async (req, res) => {
  const article = await Article.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  return res.json(article)
})

// delete an article
router.delete('/:id', verify, async (req, res) => {
  const article = await Article.findOneAndDelete({ _id: req.params.id })
  return res.json(article)
})

export default router