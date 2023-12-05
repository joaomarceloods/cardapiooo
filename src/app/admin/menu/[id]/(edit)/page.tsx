import { authorizeMenu } from '@/lib/components/authorize'
import { connectDatabase } from '@/lib/database/connect'
import { Menu } from '@/lib/database/model'
import { FC } from 'react'
import Content from './components/content'
import { normalizeState } from './reducer/normalizr'
import { ReducerProvider } from './reducer/provider'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()
  await authorizeMenu(id)

  const normalizedState = await Menu.findById(id)
    .exec()
    .then((d) => d.toJSON())
    .then(normalizeState)

  const initialState = {
    touched: false,
    ...normalizedState,
  }

  return (
    <ReducerProvider initialState={initialState}>
      <Content />
    </ReducerProvider>
  )
}

export default Page
