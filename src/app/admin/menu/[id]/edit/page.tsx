import { DBMenu } from '@/mongoose/model'
import { FC } from 'react'
import { normalizeState } from './provider/normalizr'
import Provider from './provider/provider'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  const initialState = await DBMenu.findById(id)
    .exec()
    .then((d) => d.toJSON())
    .then(normalizeState)

  return <Provider initialState={initialState} />
}

export default Page
