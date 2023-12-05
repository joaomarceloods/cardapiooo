import { Button, Empty, Spin, theme } from 'antd'
import useCreateMenu from '../hooks/useNewMenu'
import { useReducerState } from '../reducer/provider'

const BlankState = () => {
  const { token } = theme.useToken()
  const state = useReducerState()
  const businessId = state.result
  const { menus } = state.entities.businesses[businessId]
  const [createMenu, saving] = useCreateMenu()

  if (menus.length > 0) return null

  return (
    <Empty
      description="Ainda não há nenhum menu"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ padding: token.margin }}
    >
      <Button onClick={createMenu} disabled={saving} size="large">
        Criar menu
      </Button>
      <Spin fullscreen spinning={saving} />
    </Empty>
  )
}

export default BlankState
