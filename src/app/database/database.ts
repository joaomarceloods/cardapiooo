import { Db, MongoClient } from 'mongodb'

export const withDatabase = async <T = any>(
  callback: (database: Db) => Promise<T>
): Promise<T> => {
  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DBNAME

  if (uri === undefined) {
    throw new Error('MONGODB_URI is undefined')
  }

  if (dbName === undefined) {
    throw new Error('MONGODB_DBNAME is undefined')
  }

  const client = new MongoClient(uri)

  try {
    const db = client.db(dbName)
    const result = await callback(db)
    return result
  } finally {
    await client.close()
  }
}
