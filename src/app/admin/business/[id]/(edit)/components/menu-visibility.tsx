import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Tooltip, theme } from 'antd'
import { FC } from 'react'
import { useReducerState } from '../reducer/provider'

const MenuVisibility: FC<{ id: string }> = ({ id }) => {
  const { token } = theme.useToken()
  const state = useReducerState()
  const { visible } = state.entities.menus[id]

  return visible ? (
    <Tooltip placement="topRight" title="Publicly visible">
      <EyeOutlined />
    </Tooltip>
  ) : (
    <Tooltip placement="topRight" title="Hidden from public">
      <span style={{ color: token.colorTextSecondary }}>
        <EyeInvisibleOutlined />
      </span>
    </Tooltip>
  )
}

export default MenuVisibility
