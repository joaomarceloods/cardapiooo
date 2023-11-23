import { HolderOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useReducerState } from '../provider/provider'
import Product from './items/product'
import Remark from './items/remark'

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
          <Flex
            gap={4}
            align="center"
            justify="flex-start"
            style={{ paddingBottom: 4 }}
          >
            <div {...provided.dragHandleProps}>
              <HolderOutlined />
            </div>
            {itemComponent}
          </Flex>
        </div>
      )}
    </Draggable>
  )
}

export default Item
