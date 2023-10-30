import { update } from '@/app/database/database'
import { ObjectId, Document } from 'mongodb'

export async function POST(request: Request) {
  const json = await request.json()
  const document = {
    _id: ObjectId.createFromHexString(json._id),
    title: json.title,
    sortedMenuIds: json.sortedMenuIds.map((id: string) =>
      ObjectId.createFromHexString(id)
    ),
  }
  const success = await update('businesses', document)
  return Response.json({ success })
}
