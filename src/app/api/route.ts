import { DenormalizedEntity } from "@/components/menu-editor/provider/types"
import { MongoClient } from "mongodb"

export async function POST(request: Request) {
  const res = await request.json() as DenormalizedEntity.Menu
  const updatedMenu = await saveMenu(res)
  // TODO: confirm updated menu or handle error
}

async function saveMenu(menu: DenormalizedEntity.Menu) {
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
    const database = client.db(dbName)
    const menus = database.collection<DenormalizedEntity.Menu>('menus')

    const query = { id: menu.id }
    const options = {}
    const updatedMenu = await menus.replaceOne(query, menu, options)

    if (updatedMenu === null) {
      throw new Error('menu is null')
    }

    return updatedMenu
  } finally {
    await client.close()
  }
}
