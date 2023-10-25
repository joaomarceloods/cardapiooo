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
    const menus = database.collection<DenormalizedEntity.Menu>('menus')

    // Intentionally leave out `_id` to avoid having to work around MongoDB's ObjectId type.
    // It still keeps the custom `id` field (no underscore) which is used like a slug.
    const menu = await menus.findOne({}, { projection: { _id: 0 } })

    if (menu === null) {
      throw new Error(`Entity not found: ${menus.collectionName}`)
    }

    return normalizeState(menu)
  })
}
