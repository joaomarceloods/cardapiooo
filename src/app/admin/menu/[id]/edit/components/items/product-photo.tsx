import { PutBlobResult } from '@vercel/blob'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useReducerDispatch, useReducerState } from '../../provider/provider'
import { Entity, Reducer } from '../../provider/types'

const ProductPhoto: FC<{ menuId: string; itemId: string }> = ({
  menuId,
  itemId,
}) => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const item = state.entities.items[itemId]
  const { title, price, description, photo } = item.data as Entity.ProductData

  const [uploading, setUploading] = useState<boolean>(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    // TODO: handle error
    const response = await fetch(
      `/api/product-photo?menu=${menuId}&item=${itemId}`,
      {
        method: 'POST',
        body: file,
      }
    )

    setUploading(false)
    const newBlob: PutBlobResult = await response.json()

    dispatch({
      type: Reducer.ActionType.ChangeItem,
      payload: { value: newBlob.url, id: itemId, property: 'photo' },
    })
  }

  return (
    <>
      <input type="file" onChange={handleChange} />
      {uploading ? (
        <span>Uploading...</span>
      ) : photo ? (
        <a href={photo}>
          <Image src={photo} alt="Product photo" width={30} height={30} />
        </a>
      ) : (
        <span>No photo</span>
      )}
    </>
  )
}

export default ProductPhoto
