import { model, models } from 'mongoose'
import { BusinessSchema, MenuSchema } from './schema'

export const DBMenu = models.Menu || model('Menu', MenuSchema)
export const DBBusiness = models.Business || model('Business', BusinessSchema)
