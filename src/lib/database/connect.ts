import mongoose from 'mongoose'

export const connectDatabase = async () => {
  mongoose.set('debug', !!process.env.MONGO_DEBUG)

  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI)
  } else {
    throw new Error('MONGODB_URI is undefined')
  }
}
