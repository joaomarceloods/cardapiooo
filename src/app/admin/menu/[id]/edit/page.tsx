import { authorizeMenu } from '@/authorize'
import { connectDatabase } from '@/database/connect'
import { Menu } from '@/database/model'
import { FC } from 'react'
import { normalizeState } from './provider/normalizr'
import Provider from './provider/provider'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()
  await authorizeMenu(id)

  const initialState = await Menu.findById(id)
    .exec()
    .then((d) => d.toJSON())
    .then(normalizeState)

  return <Provider initialState={initialState} />
}

export default Page
