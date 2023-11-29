import RowDivider from '@/lib/components/row-divider'
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'
import ActionBar from './action-bar'
import Menu from './menu'
import Title from './title'

const Business = () => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const state = useReducerState()
  const dispatch = useReducerDispatch()

  const { menus } = state.entities.businesses[state.result]

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ background: 'white' }}>
        <ActionBar />
        <Title />
        <RowDivider />
        <Droppable droppableId="business" type="MENU">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {menus.map((id, index) => (
                <Menu key={id} id={id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default Business
