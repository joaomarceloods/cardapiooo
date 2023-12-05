import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, theme } from 'antd'
import { FC } from 'react'
import { useReducerDispatch } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const ItemDropdown: FC<{ sectionId: string; itemId: string }> = ({
  sectionId,
  itemId,
}) => {
  const dispatch = useReducerDispatch()
  const { token } = theme.useToken()

  const handleDelete = () => {
    dispatch({
      type: Reducer.ActionType.DeleteItem,
      payload: { id: itemId, sectionId },
    })
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Apagar',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: handleDelete,
    },
  ]

  return (
    <Dropdown placement="bottomRight" menu={{ items }}>
      <InfoCircleOutlined
        style={{
          color: token.colorTextDisabled,
          padding: token.marginXS,
          cursor: 'pointer',
        }}
      />
    </Dropdown>
  )
}

export default ItemDropdown
