import { authorizeMenu } from '@/authorize'
import { connectDatabase } from '@/database/connect'
import { Menu } from '@/database/model'
import { FC } from 'react'
import Content from './components/content'
import { normalizeState } from './reducer/normalizr'
import { ReducerProvider } from './reducer/provider'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()
  await authorizeMenu(id)

  const initialState = await Menu.findById(id)
    .exec()
    .then((d) => d.toJSON())
    .then(normalizeState)

  return (
    <ReducerProvider initialState={initialState}>
      <Content />
    </ReducerProvider>
  )
}

export default Page
