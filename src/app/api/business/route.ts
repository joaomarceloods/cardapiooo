import { connectDatabase } from '@/database/connect'
import { Business } from '@/database/model'

export async function POST(request: Request) {
  await connectDatabase()
  const json = await request.json()
  const business = await Business.findById(json.id).exec()
  business.set(json)
  await business.save()
  return Response.json(null)
}
