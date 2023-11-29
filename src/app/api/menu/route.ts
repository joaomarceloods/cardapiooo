import { connectDatabase } from '@/database/connect'
import { Menu } from '@/database/model'

export async function POST(request: Request) {
  await connectDatabase()
  const json = await request.json()
  const menu = await Menu.findById(json.id).exec()
  menu.set(json)
  await menu.save()
  return Response.json({ success: true })
}
