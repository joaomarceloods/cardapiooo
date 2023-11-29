import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Space, Switch, Tooltip } from 'antd'
import { useReducerDispatch, useReducerState } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const MenuVisibility = () => {
  const dispatch = useReducerDispatch()
  const state = useReducerState()
  const menuId = state.result
  const { visible } = state.entities.menus[menuId]

  return (
    <Tooltip
      placement="bottomRight"
      title={visible ? 'Publicly visible' : 'Not visible to public'}
    >
      <Space>
        {visible ? 'Published' : 'Hidden'}
        <Switch
          checked={visible}
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
          onChange={(checked) => {
            dispatch({
              type: Reducer.ActionType.ChangeMenu,
              payload: { property: 'visible', value: checked },
            })
          }}
        />
      </Space>
    </Tooltip>
  )
}

export default MenuVisibility
