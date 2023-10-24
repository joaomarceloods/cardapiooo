import { DenormalizedEntity } from '@/app/admin/editor/provider/types'
import { withDatabase } from '../database/database'
import { Document, UpdateResult } from 'mongodb'

export async function POST(request: Request) {
  const res = (await request.json()) as DenormalizedEntity.Menu
  const updatedMenu = await saveMenu(res)
  const success = updatedMenu.modifiedCount === 1
  return Response.json({ success })
}

async function saveMenu(menu: DenormalizedEntity.Menu): Promise<Document | UpdateResult<DenormalizedEntity.Menu>> {
  return withDatabase(async (database) => {
    const menus = database.collection<DenormalizedEntity.Menu>('menus')
    const updatedMenu = await menus.replaceOne({ id: menu.id }, menu)

    if (updatedMenu === null) {
      throw new Error('menu is null')
    }

    return updatedMenu
  })
}
