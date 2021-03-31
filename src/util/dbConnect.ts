import mongoose from 'mongoose'

const connection: ConnectionIF = {
  isConnected: 0
}

interface ConnectionIF {
  isConnected: number
}

async function dbConnect() {
  if (connection.isConnected > 0) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
