import Identation from '@/lib/components/identation'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { FC } from 'react'
import { useReducerDispatch } from '../reducer/provider'
import { Reducer } from '../reducer/types'

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
          Adicionar item
        </Button>
        <Button
          type="link"
          onClick={addSection}
          icon={<PlusOutlined />}
          style={{ paddingLeft: 8, paddingRight: 8 }}
        >
          Adicionar seção abaixo
        </Button>
      </Space>
    </Identation>
  )
}

export default AddItem
