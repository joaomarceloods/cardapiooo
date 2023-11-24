import { PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { FC } from 'react'
import { useReducerDispatch } from '../provider/provider'
import { Reducer } from '../provider/types'
import Identation from './identation'

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
    <Identation>
      <Space>
        <Button
          type="link"
          onClick={addItem}
          icon={<PlusOutlined />}
          style={{ paddingLeft: 8, paddingRight: 8 }}
        >
          Add item
        </Button>
        <Button
          type="link"
          onClick={addSection}
          icon={<PlusOutlined />}
          style={{ paddingLeft: 8, paddingRight: 8 }}
        >
          Add section below
        </Button>
      </Space>
    </Identation>
  )
}

export default AddItem
