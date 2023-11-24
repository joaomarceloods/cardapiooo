import { PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { FC } from 'react'
import { useReducerDispatch } from '../provider/provider'
import { Reducer } from '../provider/types'

const AddItem: FC<{ sectionId: string }> = ({ sectionId }) => {
  const dispatch = useReducerDispatch()

  const addItem = () => {
    dispatch({
      type: Reducer.ActionType.AddItem,
      payload: { sectionId },
    })
  }

  const addSection = () => {
    dispatch({
      type: Reducer.ActionType.AddSection,
      payload: { afterSectionId: sectionId },
    })
  }

  return (
    <div style={{ paddingLeft: 46 }}>
      <Space>
        <Button type="link" onClick={addItem} icon={<PlusOutlined />}>
          Add item
        </Button>
        <Button type="link" onClick={addSection} icon={<PlusOutlined />}>
          Add section below
        </Button>
      </Space>
    </div>
  )
}

export default AddItem
