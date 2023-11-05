import { DBBusiness } from '@/mongoose/model'

export async function POST(request: Request) {
  const json = await request.json()
  const business = await DBBusiness.findById(json.id).exec()
  business.set(json)
  await business.save()
  return Response.json(null)
}
