import { connectDatabase } from '@/mongoose/connect'
import { DBBusiness } from '@/mongoose/model'
import { FC } from 'react'
import Editor from './components/editor'
import { normalizeState } from './provider/normalizr'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()

  const initialState = await DBBusiness.findById(id)
    .populate('menus', 'title')
    .exec()
    .then((d) => d.toJSON({ flattenObjectIds: true, virtuals: true }))
    .then(normalizeState)

  return <Editor initialState={initialState} />
}

export default Page
