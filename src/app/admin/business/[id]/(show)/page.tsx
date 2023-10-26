import { withDatabase } from '@/app/database/database'
import { FC } from 'react'
import { DenormalizedEntity } from '../edit/provider/types'
import Link from 'next/link'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  console.log(id)
  const initialState = await getInitialState()

  return (
    <div>
      <Link href={`/admin/business/${id}/edit`}>Edit</Link>
      <h3>{initialState.title}</h3>
      {initialState.sortedMenuIds.map((menuId) => (
        <div key={menuId}>{menuId}</div>
      ))}
    </div>
  )
}

export default Page

async function getInitialState(): Promise<DenormalizedEntity.Business> {
  return withDatabase(async (database) => {
    const collection =
      database.collection<DenormalizedEntity.Business>('businesses')

    // Intentionally leave out `_id` to avoid having to work around MongoDB's ObjectId type.
    // It still keeps the custom `id` field (no underscore) which is used like a slug.
    const entity = await collection.findOne({}, { projection: { _id: 0 } })

    if (entity === null) {
      throw new Error(`Entity not found: ${collection.collectionName}`)
    }

    return entity
  })
}
