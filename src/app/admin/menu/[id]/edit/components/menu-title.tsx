import Identation from '@/lib/components/identation'
import { Input } from 'antd'
import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'

const MenuTitle = () => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const { title } = state.entities.menus[state.result]

  return (
    <Identation>
      <Input
        size="small"
        placeholder="Enter menu name…"
        bordered={false}
        value={title}
        style={{ fontSize: '2em' }}
        onChange={(e) =>
          dispatch({
            type: Reducer.ActionType.ChangeMenu,
            payload: { property: 'title', value: e.target.value },
          })
        }
      />
    </Identation>
  )
}

export default MenuTitle
