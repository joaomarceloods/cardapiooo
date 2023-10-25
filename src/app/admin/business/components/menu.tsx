import Link from 'next/link'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Menu: FC<{ id: string; index: number }> = ({ id, index }) => {
  const menu = { id }

  return (
    <Draggable key={menu.id} draggableId={menu.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <span>
            <span {...provided.dragHandleProps}>☰</span>
            <span>{menu.id}</span>
            <Link href={`/admin/menu`}>Edit</Link>
          </span>
        </div>
      )}
    </Draggable>
  )
}

export default Menu
