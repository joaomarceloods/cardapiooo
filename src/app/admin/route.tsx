import { connectDatabase } from '@/lib/database/connect'
import { Business, BusinessUser } from '@/lib/database/model'
import { SaveError } from '@/lib/errors'
import { auth } from '@clerk/nextjs'
import mongoose from 'mongoose'
import { redirect } from 'next/navigation'

export const GET = async () => {
  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })
  await connectDatabase()
  const businessUser = await findOrCreateBusinessUser({ userId })
  if (!businessUser) return new Response('Unauthorized', { status: 401 })
  redirect(`/admin/business/${businessUser.business}`)
}

const findOrCreateBusinessUser = async ({
  userId,
}: {
  userId: string
}): Promise<any> => {
  return (
    (await BusinessUser.findOne({ user: userId }).exec()) ||
    (await createBusinessUser({ userId }))
  )
}

const createBusinessUser = async ({
  userId,
}: {
  userId: string
}): Promise<any> => {
  let businessUser
  const session = await mongoose.startSession()
  await session.withTransaction(async () => {
    const business = await new Business().save()
    if (!business) throw new SaveError()
    businessUser = await new BusinessUser({
      business: business.id,
      user: userId,
    }).save()
    if (!businessUser) throw new SaveError()
  })
  await session.endSession()
  return businessUser
}
