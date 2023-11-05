import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useReducerState } from '../provider/provider'
import Product from './items/product'
import Remark from './items/remark'

const Item: FC<{ id: string; index: number }> = ({ id, index }) => {
  const state = useReducerState()
  const { type } = state.entities.items[id]

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <span {...provided.dragHandleProps}>☰</span>
          {type === 'product' ? (
            <Product id={id} />
          ) : type === 'remark' ? (
            <Remark id={id} />
          ) : (
            <>bad</>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default Item
