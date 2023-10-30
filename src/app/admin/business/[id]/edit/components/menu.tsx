import Link from 'next/link'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useReducerState } from '../provider/provider';

const Menu: FC<{ id: string; index: number }> = ({ id, index }) => {
  const state = useReducerState()
  const menu = state.entities.menus[id]

  return (
    <Draggable key={menu._id} draggableId={menu._id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <span>
            <span {...provided.dragHandleProps}>☰</span>
            <span>{menu.title}</span>
          </span>
        </div>
      )}
    </Draggable>
  )
}

export default Menu
