import { Button, Empty, theme } from 'antd'
import { useReducerDispatch, useReducerState } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const BlankState = () => {
  const { token } = theme.useToken()
  const dispatch = useReducerDispatch()
  const state = useReducerState()
  const menuId = state.result
  const { sections } = state.entities.menus[menuId]

  const addSection = () => {
    dispatch({
      type: Reducer.ActionType.AddSection,
      payload: { afterSectionId: undefined },
    })
  }

  if (sections.length > 0) return null

  return (
    <Empty
      description="Este menu está vazio"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ padding: token.margin }}
    >
      <Button size="large" onClick={addSection}>
        Adicionar seção
      </Button>
    </Empty>
  )
}

export default BlankState
