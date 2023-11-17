import { FC } from 'react'
import { useReducerDispatch } from '../provider/provider'
import { Reducer } from '../provider/types'

const AddSection: FC<{ afterSectionId?: string }> = ({ afterSectionId }) => {
  const dispatch = useReducerDispatch()
  return (
    <button
      style={{ display: 'block' }}
      onClick={() =>
        dispatch({
          type: Reducer.ActionType.AddSection,
          payload: { afterSectionId },
        })
      }
    >
      Add section
    </button>
  )
}

export default AddSection
