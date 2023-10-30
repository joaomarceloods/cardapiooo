import { findOne } from '@/app/database/database'
import { AppDocument } from '@/app/database/types'
import { ObjectId } from 'mongodb'
import Link from 'next/link'
import { FC } from 'react'
import { normalizeState } from '../edit/provider/normalizr'

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  const initialState = await findOne<AppDocument.BusinessWithMenus>(
    'businessesWithMenus',
    { _id: new ObjectId(id) }
  )
    .then(JSON.stringify)
    .then(JSON.parse)
    .then(normalizeState)

  const business = initialState.entities.businesses[initialState.result]

  return (
    <div>
      <Link href={`/admin/business/${id}/edit`}>Edit</Link>
      <h3>{business.title}</h3>
      {business.sortedMenuIds.map((menuId) => {
        const menu = initialState.entities.menus[menuId]
        return <div key={menuId}>{menu.title}</div>
      })}
    </div>
  )
}

export default Page
