import { DeleteOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { FC, PropsWithChildren } from 'react'
import { useReducerDispatch } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const SectionDropdown: FC<PropsWithChildren<{ sectionId: string }>> = ({
  sectionId,
  children,
}) => {
  const dispatch = useReducerDispatch()

  const handleDelete = () => {
    dispatch({
      type: Reducer.ActionType.DeleteSection,
      payload: { id: sectionId },
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

export default SectionDropdown
