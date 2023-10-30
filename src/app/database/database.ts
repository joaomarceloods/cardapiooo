import { Db, Document, Filter, MongoClient, WithId } from 'mongodb'

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

export const findOne = <TDocument extends Document>(
  collectionName: string,
  filter: Filter<TDocument>
): Promise<WithId<TDocument>> => {
  return withDatabase(async (database) => {
    const collection = database.collection<TDocument>(collectionName)
    const document = await collection.findOne(filter)

    if (document === null) {
      throw new Error(`Document not found: ${collection.collectionName}`)
    }

    return document
  })
}

export const update = async (collectionName: string, document: WithId<any>) => {
  return withDatabase(async (database) => {
    const collection = database.collection(collectionName)
    const updatedDocument = await collection.replaceOne(
      { _id: document._id },
      document
    )
    return updatedDocument.modifiedCount > 0
  })
}
