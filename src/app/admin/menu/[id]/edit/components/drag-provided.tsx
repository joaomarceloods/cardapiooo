import { theme } from 'antd'
import { FC, PropsWithChildren } from 'react'
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'

const DragProvided: FC<
  PropsWithChildren<{
    provided: DroppableProvided
    snapshot: DroppableStateSnapshot
  }>
> = ({ provided, snapshot, children }) => {
  const { token } = theme.useToken()

  return (
    <div
      ref={provided.innerRef}
      style={{
        transition: 'background-color 0.2s ease',
        backgroundColor: snapshot.isDraggingOver
          ? token.colorFillSecondary
          : 'inherit',
      }}
      {...provided.droppableProps}
    >
      {children}
      {provided.placeholder}
    </div>
  )
}

export default DragProvided
