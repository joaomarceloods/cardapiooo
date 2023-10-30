import mongoose from 'mongoose'

export const connectDatabase = async () => {
  if (process.env.MONGODB_URI) await mongoose.connect(process.env.MONGODB_URI)
  else {
    throw new Error('process.env.MONGODB_URI is undefined')
  }
}
