import { Business, BusinessUser } from '@/lib/database/model'
import { NotAuthorizedError } from '@/lib/errors'
import { auth } from '@clerk/nextjs'

export const authorizeBusiness = async (businessId: string) => {
  const { userId } = auth()
  if (!userId) throw new NotAuthorizedError()
  const businessUser = await BusinessUser.exists({
    user: userId,
    business: businessId,
  })
  if (!businessUser) throw new NotAuthorizedError()
}

export const authorizeMenu = async (menuId: string) => {
  const business = await Business.findOne({ menus: menuId }).exec()
  if (!business) throw new NotAuthorizedError()
  await authorizeBusiness(business.id)
}
