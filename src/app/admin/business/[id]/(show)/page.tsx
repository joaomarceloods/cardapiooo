import { authorizeBusiness } from '@/authorize'
import { connectDatabase } from '@/database/connect'
import { Business } from '@/database/model'
import Link from 'next/link'
import { FC } from 'react'
import { normalizeState } from '../edit/provider/normalizr'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()
  await authorizeBusiness(id)

  const initialState = await Business.findById(id)
    .populate('menus', 'title')
    .exec()
    .then((d) => d.toJSON({ virtuals: true }))
    .then(normalizeState)

  const business = initialState.entities.businesses[initialState.result]

  return (
    <div>
      <Link href={`/admin/business/${id}/edit`}>Edit</Link>
      <h3>{business.title}</h3>
      {business.menus.map((menuId) => {
        const menu = initialState.entities.menus[menuId]
        return (
          <div key={menuId}>
            {menu.title} <Link href={`/admin/menu/${menuId}/edit`}>[edit]</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Page
