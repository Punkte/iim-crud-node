import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
})

User.plugin(uniqueValidator)

export default mongoose.model('User', User)