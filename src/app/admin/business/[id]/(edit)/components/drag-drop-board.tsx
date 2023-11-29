import { FC, PropsWithChildren } from 'react'
import {
  DragDropContext,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import { useReducerDispatch } from '../reducer/provider'
import { Reducer } from '../reducer/types'

export enum DraggableType {
  Menu = 'MENU',
}

const DragDropBoard: FC<PropsWithChildren> = ({ children }) => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const dispatch = useReducerDispatch()

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return
    }

    dispatch({
      type: Reducer.ActionType.MoveMenu,
      payload: {
        id: result.draggableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      },
    })
  }

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}

export default DragDropBoard
