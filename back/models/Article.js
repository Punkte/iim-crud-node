import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Article = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  }
})

Article.plugin(uniqueValidator)

export default mongoose.model('Article', Article)