import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'

const TitleInput = () => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()

  const { title } = state.entities.businesses[state.result]

  return (
    <input
      type="text"
      value={title}
      style={{ fontSize: '1.2em' }}
      onChange={(e) =>
        dispatch({
          type: Reducer.ActionType.ChangeBusiness,
          payload: { property: 'title', value: e.target.value },
        })
      }
    />
  )
}

export default TitleInput
