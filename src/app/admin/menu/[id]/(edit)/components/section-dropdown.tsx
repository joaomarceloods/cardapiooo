import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, theme } from 'antd'
import { FC } from 'react'
import { useReducerDispatch } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const SectionDropdown: FC<{ sectionId: string }> = ({ sectionId }) => {
  const { token } = theme.useToken()
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
    <Dropdown menu={{ items }} placement="top">
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

export default SectionDropdown
