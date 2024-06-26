import { authorizeBusiness, authorizeMenu } from '@/lib/components/authorize'
import { connectDatabase } from '@/lib/database/connect'
import { Business, Menu } from '@/lib/database/model'
import { SaveError } from '@/lib/errors'
import mongoose from 'mongoose'

export async function POST(request: Request) {
  const json = await request.json()
  await connectDatabase()
  await authorizeBusiness(json.business)

  const business = await Business.findById(json.business).exec()
  if (!business) throw new SaveError()

  const menu = new Menu(json)
  if (!menu.sections || menu.sections.length === 0) {
    const emptyItem = { type: 'product', data: { title: '', price: 0 } }
    const emptySection = { title: '', items: [emptyItem, emptyItem, emptyItem] }
    menu.sections = [emptySection]
  }

  const session = await mongoose.startSession()
  await session.withTransaction(async () => {
    const newMenu = await menu.save({ session })
    if (!newMenu) throw new SaveError()
    business.menus.unshift(menu)
    const newBusiness = await business.save({ session })
    if (!newBusiness) throw new SaveError()
  })
  await session.endSession()

  return Response.json(menu)
}

export async function PUT(request: Request) {
  const json = await request.json()
  await connectDatabase()
  await authorizeMenu(json.id)
  const menu = await Menu.findById(json.id).exec()
  menu.set(json)
  await menu.save()
  return Response.json(menu)
}

export async function DELETE(request: Request) {
  const json = await request.json()
  await connectDatabase()
  await authorizeMenu(json.id)

  const business = await Business.findOne({ menus: json.id }).exec()
  if (!business) throw new SaveError()
  business.menus = business.menus.filter((m: any) => m.id !== json.id)

  const session = await mongoose.startSession()
  await session.withTransaction(async () => {
    // TODO: throw errors?
    await Menu.findByIdAndDelete(json.id, { session })
    await business.save({ session })
  })
  await session.endSession()

  return Response.json({ success: true })
}
