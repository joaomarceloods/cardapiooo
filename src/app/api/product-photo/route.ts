import { del, list, put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData()
  const photo = formData.get('photo') as File | null

  if (!photo) {
    return NextResponse.json({ error: 'Photo Required' }, { status: 400 })
  }

  const { searchParams } = new URL(request.url)
  const menu = searchParams.get('menu')
  const item = searchParams.get('item')
  const pathname = `menu/${menu}/item/${item}/product-photo/${photo.name}`
  const blob = await put(pathname, photo, { access: 'public' })

  const oldPhotos = await list({ prefix: pathname })
  oldPhotos.blobs.forEach(async (blob) => await del(blob.url))

  return NextResponse.json(blob)
}

// TODO: DELETE
