import { connectDatabase } from '@/database/connect'
import { BusinessUser } from '@/database/model'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export const GET = async () => {
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  await connectDatabase()
  const businessUser = await BusinessUser.findOne({ user: userId }).exec()

  if (!businessUser) {
    redirect('/admin/business/new')
  }

  redirect(`/admin/business/${businessUser.business}`)
}
