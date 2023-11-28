import { Menu } from '@/database/model'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const json = await request.json()
  const menu = await Menu.findById(json.id).exec()
  menu.set(json)
  await menu.save()
  revalidatePath(`/admin/menu/${json.id}`)
  return Response.json({ success: true })
}
