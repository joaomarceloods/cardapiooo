import { FC } from 'react'
import { useMenuEditor, useMenuEditorDispatch } from '../../provider/provider'
import { Entity, MenuEditorActionType } from '../../provider/types'

const Product: FC<{ id: string }> = ({ id }) => {
  const state = useMenuEditor()
  const dispatch = useMenuEditorDispatch()
  const item = state.entities.items[id]
  const { title, price, description } = item.data as Entity.ProductData

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    property: string
  ) => {
    dispatch({
      type: MenuEditorActionType.ChangeItem,
      payload: { value: e.target.value, id, property },
    })
  }

  return (
    <>
      <input value={title} onChange={(e) => handleChange(e, 'title')} />
      <input value={price} onChange={(e) => handleChange(e, 'price')} />
      <br />
      <textarea
        value={description}
        onChange={(e) => handleChange(e, 'description')}
      />
    </>
  )
}

export default Product
