import Link from 'next/link'
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'
import MenuTitle from './menu-title'
import RowDivider from './row-divider'
import SaveButton from './save-button'
import Section from './section'

const Menu = () => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const state = useReducerState()
  const dispatch = useReducerDispatch()

  const { sections } = state.entities.menus[state.result]

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
      <Link href={`/admin`}>Cancel</Link>
      <div>
        <MenuTitle />
        <RowDivider />
        {sections.length === 0 && (
          <>
            <h3>This menu is empty</h3>
            {/* TODO: add section */}
          </>
        )}
        <Droppable droppableId="board" type="SECTION">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((id, index) => (
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
