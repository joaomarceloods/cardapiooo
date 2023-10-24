import MenuEditor from '@/components/menu-editor/menu-editor'
import { normalizeMenu } from '@/components/menu-editor/provider/normalizr'
import { DenormalizedEntity } from '@/components/menu-editor/provider/types'
import { MongoClient } from 'mongodb'

export default async function Home() {
  const initialState = await getMenuProps()

  return <MenuEditor initialState={initialState} />
}

async function getMenuProps() {
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

    const query = {}
    const options = { projection: { _id: 0 } }
    const menu = await menus.findOne(query, options)

    if (menu === null) {
      throw new Error('menu is null')
    }

    return normalizeMenu(menu)
  } finally {
    await client.close()
  }
}
