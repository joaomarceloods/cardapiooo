import { FC } from 'react'
import { useReducerDispatch, useReducerState } from '../../provider/provider'
import { Entity, Reducer } from '../../provider/types'
import ProductPhoto from './product-photo'

const Product: FC<{ id: string }> = ({ id }) => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const menuId = state.result
  const item = state.entities.items[id]
  const { title, price, description } = item.data as Entity.ProductData

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    property: string
  ) => {
    dispatch({
      type: Reducer.ActionType.ChangeItem,
      payload: { value: e.target.value, id, property },
    })
  }

  return (
    <>
      <input value={title} onChange={(e) => handleChange(e, 'title')} />
      <input value={price} onChange={(e) => handleChange(e, 'price')} />
      <ProductPhoto menuId={menuId} itemId={id} />
      <br />
      <textarea
        value={description}
        onChange={(e) => handleChange(e, 'description')}
      />
    </>
  )
}

export default Product
