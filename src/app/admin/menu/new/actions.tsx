'use server'

import { Business, BusinessUser, Menu } from '@/database/model'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export const submit = async (formData: FormData) => {
  const { userId } = auth()
  const title = formData.get('title')

  const businessUser = await BusinessUser.findOne({ user: userId }).exec()

  if (!businessUser) {
    return new Response('Business User Not Found', { status: 404 })
  }

  const business = await Business.findById(businessUser.business).exec()

  if (!business) {
    return new Response('Business Not Found', { status: 404 })
  }

  const menu = await new Menu({ title }).save()
  business.menus.push(menu.id)
  business.save()

  redirect(`/admin/menu/${menu.id}/edit`)
}
