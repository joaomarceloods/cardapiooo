import Identation from '@/lib/components/identation'
import { Input } from 'antd'
import { useReducerDispatch, useReducerState } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const Title = () => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const { title } = state.entities.businesses[state.result]

  return (
    <Identation>
      <Input
        size="small"
        placeholder="Enter business name…"
        bordered={false}
        value={title}
        style={{ fontSize: '2em' }}
        onChange={(e) =>
          dispatch({
            type: Reducer.ActionType.ChangeBusiness,
            payload: { property: 'title', value: e.target.value },
          })
        }
      />
    </Identation>
  )
}

export default Title
