import { DBMenu } from '@/mongoose/model'
import { FC } from 'react'
import Editor from './components/editor'
import { normalizeState } from './provider/normalizr'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  const initialState = await DBMenu.findById(id)
    .exec()
    .then((d) => d.toJSON())
    .then(normalizeState)

  return <Editor initialState={initialState} />
}

export default Page
