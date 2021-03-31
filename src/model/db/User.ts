import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean
    },
}, { versionKey: false });
export default mongoose.models?.User || mongoose.model('User', UserSchema)
