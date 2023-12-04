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
      description="There are no menus yet"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ padding: token.margin }}
    >
      <Button onClick={createMenu} disabled={saving} size="large">
        Create menu
      </Button>
      <Spin fullscreen spinning={saving} />
    </Empty>
  )
}

export default BlankState
