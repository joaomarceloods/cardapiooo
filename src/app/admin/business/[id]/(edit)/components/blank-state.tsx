import { Empty, theme } from 'antd'
import { useReducerState } from '../reducer/provider'
import CreateMenu from './create-menu'

const BlankState = () => {
  const { token } = theme.useToken()
  const state = useReducerState()
  const businessId = state.result
  const { menus } = state.entities.businesses[businessId]

  if (menus.length > 0) return null

  return (
    <Empty
      description="There are no menus yet"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ padding: token.margin }}
    >
      <CreateMenu buttonProps={{ size: 'large' }} />
    </Empty>
  )
}

export default BlankState
