import Editor from '@/app/admin/editor/components/editor'
import { normalizeState } from '@/app/admin/editor/provider/normalizr'
import { DenormalizedEntity, Reducer } from '@/app/admin/editor/provider/types'
import { withDatabase } from '@/app/database/database'

export default async function Home() {
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
      throw new Error('menu is null')
    }

    return normalizeState(menu)
  })
}
