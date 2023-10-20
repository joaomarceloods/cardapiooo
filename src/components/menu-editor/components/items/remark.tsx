import { useMenuEditor, useMenuEditorDispatch } from '../../provider/provider'
import { MenuEditorActionType, MenuEditorState } from '../../provider/types'

const Remark = ({ id }: { id: string }) => {
  const board = useMenuEditor()
  const dispatch = useMenuEditorDispatch()
  const { content } = board.items[id].data as MenuEditorState.RemarkData

  return (
    <>
      <textarea
        value={content}
        onChange={(e) =>
          dispatch({
            type: MenuEditorActionType.ChangeItem,
            payload: { id, property: 'content', value: e.target.value },
          })
        }
      />
    </>
  )
}

export default Remark
