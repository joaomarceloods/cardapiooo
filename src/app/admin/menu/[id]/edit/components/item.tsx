import { HolderOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useReducerState } from '../provider/provider'
import Identation from './identation'
import Product from './items/product'
import Remark from './items/remark'
import RowDivider from './row-divider'

const Item: FC<{ id: string; index: number }> = ({ id, index }) => {
  const state = useReducerState()
  const { type } = state.entities.items[id]

  const itemComponent =
    type === 'product' ? (
      <Product id={id} />
    ) : type === 'remark' ? (
      <Remark id={id} />
    ) : (
      <strong>?</strong>
    )

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div
            {...provided.dragHandleProps}
            style={{ padding: 4, position: 'absolute' }}
          >
            <HolderOutlined />
          </div>
          <Identation>
            <Flex gap={4}>
              {itemComponent}
            </Flex>
          </Identation>
          <RowDivider />
        </div>
      )}
    </Draggable>
  )
}

export default Item
