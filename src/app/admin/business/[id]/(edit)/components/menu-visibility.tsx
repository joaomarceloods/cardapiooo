import { EyeInvisibleOutlined } from '@ant-design/icons'
import { Space, theme } from 'antd'
import { FC } from 'react'
import { useReducerState } from '../reducer/provider'

const MenuVisibility: FC<{ id: string }> = ({ id }) => {
  const { token } = theme.useToken()
  const state = useReducerState()
  const { visible } = state.entities.menus[id]

  if (visible) return

  return (
    <Space style={{ color: token.colorTextDisabled }}>
      <EyeInvisibleOutlined />
      Não publicado
    </Space>
  )
}

export default MenuVisibility
