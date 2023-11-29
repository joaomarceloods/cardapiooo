import { DeleteOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { FC, PropsWithChildren } from 'react'
import { useReducerDispatch } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const ItemDropdown: FC<
  PropsWithChildren<{ sectionId: string; itemId: string }>
> = ({ sectionId, itemId, children }) => {
  const dispatch = useReducerDispatch()

  const handleDelete = () => {
    dispatch({
      type: Reducer.ActionType.DeleteItem,
      payload: { id: itemId, sectionId },
    })
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Delete',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: handleDelete,
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      {children}
    </Dropdown>
  )
}

export default ItemDropdown
