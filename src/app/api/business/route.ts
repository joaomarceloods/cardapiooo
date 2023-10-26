import { DenormalizedEntity } from '@/app/admin/business/[id]/edit/provider/types'
import { withDatabase } from '@/app/database/database'
import { Document, UpdateResult } from 'mongodb'

export async function POST(request: Request) {
  const res = await request.json()
  const updatedMenu = await update(res)
  const success = updatedMenu.modifiedCount === 1
  return Response.json({ success })
}

async function update(
  entity: DenormalizedEntity.Business
): Promise<Document | UpdateResult<DenormalizedEntity.Business>> {
  return withDatabase(async (database) => {
    const collection =
      database.collection<DenormalizedEntity.Business>('businesses')
    const updatedEntity = await collection.replaceOne({ id: entity.id }, entity)

    if (updatedEntity === null) {
      throw new Error(
        `Entity couldn't be updated: ${JSON.stringify(collection)}`
      )
    }

    return updatedEntity
  })
}
