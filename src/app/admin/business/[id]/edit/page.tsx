import { authorizeBusiness } from '@/authorize'
import { connectDatabase } from '@/database/connect'
import { Business } from '@/database/model'
import { FC } from 'react'
import Editor from './components/editor'
import { normalizeState } from './reducer/normalizr'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()
  await authorizeBusiness(id)

  const initialState = await Business.findById(id)
    .populate('menus', 'title')
    .exec()
    .then((d) => d.toJSON({ virtuals: true }))
    .then(normalizeState)

  return <Editor initialState={initialState} />
}

export default Page
