import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'
import SaveButton from './save-button'
import Section from './section'
import TitleInput from './title-input'

const Menu = () => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const state = useReducerState()
  const dispatch = useReducerDispatch()

  const { sortedSectionIds } = state.entities.menus[state.result]

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return
    }

    switch (result.type) {
      case 'SECTION':
        dispatch({
          type: Reducer.ActionType.MoveSection,
          payload: {
            id: result.draggableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          },
        })
        break

      case 'ITEM':
        dispatch({
          type: Reducer.ActionType.MoveItem,
          payload: {
            id: result.draggableId,
            sourceIndex: source.index,
            sourceSectionId: source.droppableId,
            destinationIndex: destination.index,
            destinationSectionId: destination.droppableId,
          },
        })
        break
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SaveButton />
      <div>
        <TitleInput />
        <Droppable droppableId="board" type="SECTION">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sortedSectionIds.map((id, index) => (
                <Section key={id} id={id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default Menu
