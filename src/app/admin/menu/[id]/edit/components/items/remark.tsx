import { FC } from 'react'
import { useReducerDispatch, useReducerState } from '../../reducer/provider'
import { Entity, Reducer } from '../../reducer/types'

const Remark: FC<{ id: string }> = ({ id }) => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const item = state.entities.items[id]
  const { content } = item.data as Entity.RemarkData

  return (
    <>
      <textarea
        value={content}
        onChange={(e) =>
          dispatch({
            type: Reducer.ActionType.ChangeItem,
            payload: { id, property: 'content', value: e.target.value },
          })
        }
      />
    </>
  )
}

export default Remark
