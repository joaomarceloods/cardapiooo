'use server'

import { Business, BusinessUser } from '@/database/model'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export const submit = async (formData: FormData) => {
  const { userId } = auth()
  const title = formData.get('title')

  const business = new Business({ title })
  await business.save()

  const businessUser = new BusinessUser({ business: business.id, user: userId })
  await businessUser.save()

  redirect(`/admin/business/${business.id}`)
}
