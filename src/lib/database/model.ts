import { model, models } from 'mongoose'
import { BusinessSchema, BusinessUserSchema, MenuSchema } from './schema'

export const Menu = models.Menu || model('Menu', MenuSchema)

export const Business = models.Business || model('Business', BusinessSchema)

export const BusinessUser =
  models.BusinessUser || model('BusinessUser', BusinessUserSchema)
