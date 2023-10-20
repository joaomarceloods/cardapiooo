import { useMenuEditor, useMenuEditorDispatch } from '../../provider/provider'
import { MenuEditorActionType, MenuEditorState } from '../../provider/types'

const Product = ({ id }: { id: string }) => {
  const board = useMenuEditor()
  const dispatch = useMenuEditorDispatch()
  const { title, price, description } = board.items[id]
    .data as MenuEditorState.ProductData

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
