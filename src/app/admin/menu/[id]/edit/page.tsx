import { findOne } from '@/app/database/database'
import { AppDocument } from '@/app/database/types'
import { ObjectId } from 'mongodb'
import { FC } from 'react'
import Editor from './components/editor'
import { normalizeState } from './provider/normalizr'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  const initialState = await findOne<AppDocument.Menu>('menus', {
    _id: new ObjectId(id),
  })
    .then(JSON.stringify)
    .then(JSON.parse)
    .then(normalizeState)

  return <Editor initialState={initialState} />
}

export default Page
