import {
  BoardActionType,
  ProductData,
  useBoard,
  useBoardDispatch,
} from '../../provider/board-provider'

const Product = ({ id }: { id: string }) => {
  const board = useBoard()
  const dispatch = useBoardDispatch()
  const { name, price, description } = board.items[id].data as ProductData

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    property: string
  ) => {
    dispatch({
      type: BoardActionType.ChangeItem,
      payload: { value: e.target.value, id, property },
    })
  }

  return (
    <>
      <input value={name} onChange={(e) => handleChange(e, 'name')} />
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
