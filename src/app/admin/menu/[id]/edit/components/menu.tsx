import { ReactEventHandler } from 'react'
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import { denormalizeState } from '../provider/normalizr'
import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'
import Section from './section'

const Menu = () => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const state = useReducerState()
  const dispatch = useReducerDispatch()

  const { title, sortedSectionIds } = state.entities.menus[state.result]

  const onClickSave: ReactEventHandler<HTMLButtonElement> = async () => {
    const denormalizedState = denormalizeState(state)

    await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify(denormalizedState),
    })
  }

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
      <button type="submit" onClick={onClickSave}>
        Save
      </button>
      <div>
        <input
          type="text"
          value={title}
          style={{ fontSize: '1.2em' }}
          onChange={(e) =>
            dispatch({
              type: Reducer.ActionType.ChangeMenu,
              payload: { property: 'title', value: e.target.value },
            })
          }
        />
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
