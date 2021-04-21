import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    category1: {
        type: String,
        required: true
    },
    category2: {
        type: String
    },
}, { versionKey: false })

export default mongoose.models?.Category || mongoose.model('Category', CategorySchema)