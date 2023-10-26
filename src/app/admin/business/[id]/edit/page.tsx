import { withDatabase } from '@/app/database/database'
import Editor from './components/editor'
import { normalizeState } from './provider/normalizr'
import { DenormalizedEntity, Reducer } from './provider/types'

export default async function Page() {
  const initialState = await getInitialState()

  return <Editor initialState={initialState} />
}

async function getInitialState(): Promise<Reducer.State> {
  return withDatabase(async (database) => {
    const collection =
      database.collection<DenormalizedEntity.Business>('businesses')

    // Intentionally leave out `_id` to avoid having to work around MongoDB's ObjectId type.
    // It still keeps the custom `id` field (no underscore) which is used like a slug.
    const entity = await collection.findOne({}, { projection: { _id: 0 } })

    if (entity === null) {
      throw new Error(`Entity not found: ${collection.collectionName}`)
    }

    return normalizeState(entity)
  })
}
