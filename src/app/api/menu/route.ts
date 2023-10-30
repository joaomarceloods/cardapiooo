import { update } from '@/app/database/database'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  const json = await request.json()
  const document = {
    _id: ObjectId.createFromHexString(json._id),
    title: json.title,
    sortedSectionIds: json.sortedSectionIds,
    sections: json.sections,
  }
  const success = await update('menus', document)
  return Response.json({ success })
}
