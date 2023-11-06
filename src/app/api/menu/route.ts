import { Menu } from '@/database/model'

export async function POST(request: Request) {
  const json = await request.json()
  const menu = await Menu.findById(json.id).exec()
  menu.set(json)
  await menu.save()
  return Response.json(null)
}
