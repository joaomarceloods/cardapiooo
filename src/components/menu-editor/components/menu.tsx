import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import { useMenuEditor, useMenuEditorDispatch } from '../provider/provider'
import { MenuEditorActionType } from '../provider/types'
import Section from './section'
import { ReactEventHandler } from 'react'
import { denormalizeMenu } from '../provider/normalizr'

const Menu = () => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const state = useMenuEditor()
  const dispatch = useMenuEditorDispatch()

  const { title, sortedSectionIds } = state.entities.menus[state.result]

  const onClickSave: ReactEventHandler<HTMLButtonElement> = async () => {
    const denormalizedState = denormalizeMenu(state)

    // TODO: possibly useSWR
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
          type: MenuEditorActionType.MoveSection,
          payload: {
            id: result.draggableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          },
        })
        break

      case 'ITEM':
        dispatch({
          type: MenuEditorActionType.MoveItem,
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
      <button type="submit" onClick={onClickSave}>Save</button>
      <div>
        <input
          type="text"
          value={title}
          style={{ fontSize: '1.2em' }}
          onChange={(e) =>
            dispatch({
              type: MenuEditorActionType.ChangeMenu,
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
