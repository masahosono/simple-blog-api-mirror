import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { versionKey: false })

export default mongoose.models?.Article || mongoose.model('Article', ArticleSchema)
