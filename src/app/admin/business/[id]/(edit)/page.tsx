import { authorizeBusiness } from '@/lib/components/authorize'
import { connectDatabase } from '@/lib/database/connect'
import { Business } from '@/lib/database/model'
import { FC } from 'react'
import Content from './components/content'
import { normalizeState } from './reducer/normalizr'
import { ReducerProvider } from './reducer/provider'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()
  await authorizeBusiness(id)

  const initialState = await Business.findById(id)
    .populate('menus', 'title visible')
    .exec()
    .then((d) => d.toJSON({ virtuals: true }))
    .then(normalizeState)

  return (
    <ReducerProvider initialState={initialState}>
      <Content />
    </ReducerProvider>
  )
}

export default Page
