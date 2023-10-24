import { FC } from 'react'
import { useMenuEditor, useMenuEditorDispatch } from '../../provider/provider'
import { Entity, MenuEditorActionType } from '../../provider/types'

const Remark: FC<{ id: string }> = ({ id }) => {
  const state = useMenuEditor()
  const dispatch = useMenuEditorDispatch()
  const item = state.entities.items[id]
  const { content } = item.data as Entity.RemarkData

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
