import { Input } from 'antd'
import { useReducerDispatch, useReducerState } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const MenuTitle = () => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const menuId = state.result
  const { title } = state.entities.menus[menuId]

  return (
    <Input
      size="small"
      placeholder="Digite o nome do menu…"
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
  )
}

export default MenuTitle
