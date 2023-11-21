import { Business, BusinessUser } from '@/database/model'
import { auth } from '@clerk/nextjs'

class NotAuthorizedError extends Error {
  constructor() {
    super('Not Authorized')
  }
}

export const authorizeBusiness = async (businessId: string) => {
  const { userId } = auth()

  if (!userId) {
    throw new NotAuthorizedError()
  }

  const businessUser = await BusinessUser.exists({
    user: userId,
    business: businessId,
  })

  if (!businessUser) {
    throw new NotAuthorizedError()
  }
}

export const authorizeMenu = async (menuId: string) => {
  const business = await Business.findOne({ menus: menuId }).exec()
  await authorizeBusiness(business.id)
}
