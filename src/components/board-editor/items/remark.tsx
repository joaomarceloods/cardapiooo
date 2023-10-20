import {
  BoardActionType,
  RemarkData,
  useBoard,
  useBoardDispatch,
} from '../board-provider'

const Product = ({ id }: { id: string }) => {
  const board = useBoard()
  const dispatch = useBoardDispatch()

  const { content } = board.items[id] as RemarkData

  return (
    <>
      <textarea
        value={content}
        onChange={(e) =>
          dispatch({
            type: BoardActionType.ChangeItem,
            payload: { id, property: 'content', value: e.target.value },
          })
        }
      />
    </>
  )
}

export default Product
