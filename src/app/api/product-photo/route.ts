import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const menu = searchParams.get('menu')
  const item = searchParams.get('item')
  const pathname = `product-photo/menu-${menu}/item-${item}`
  // TODO: handle null body
  const blob = await put(pathname, request.body!, { access: 'public' })
  return NextResponse.json(blob)
}
