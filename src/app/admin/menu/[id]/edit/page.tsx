import { connectDatabase } from '@/database/connect'
import { Business, BusinessUser, Menu } from '@/database/model'
import { auth } from '@clerk/nextjs'
import { FC } from 'react'
import { normalizeState } from './provider/normalizr'
import Provider from './provider/provider'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()

  const { userId } = auth()
  const businessUser = await BusinessUser.findOne({ user: userId }).exec()
  const business = await Business.findById(businessUser.business)
    .select('id')
    .exec()

  // TODO: handle business not found

  const initialState = await Menu.findById(id)
    .exec()
    .then((d) => d.toJSON())
    .then(normalizeState)

  return <Provider initialState={initialState} />
}

export default Page
