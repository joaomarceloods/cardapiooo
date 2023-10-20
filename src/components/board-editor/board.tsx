'use client'

import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import { BoardProvider } from './board-provider'
import initialData from './initial-data'
import Section from './section'

const Board = () => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const [state, setState] = useState(initialData)

  const moveSection: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result

    setState((state) => {
      const sortedSectionIds = Array.from(state.sortedSectionIds)
      sortedSectionIds.splice(source.index, 1)
      sortedSectionIds.splice(destination!.index, 0, draggableId)

      return {
        ...state,
        sortedSectionIds,
      }
    })
  }

  const moveItem: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result

    // Remove item from source
    setState((state) => {
      const sourceSection =
        state.sections[source.droppableId as keyof typeof state.sections]
      const sortedItemIds = Array.from(sourceSection.sortedItemIds)
      sortedItemIds.splice(source.index, 1)

      return {
        ...state,
        sections: {
          ...state.sections,
          [sourceSection.id]: {
            ...sourceSection,
            sortedItemIds,
          },
        },
      }
    })

    // Add item to destination
    setState((state) => {
      const destinationSection =
        state.sections[destination!.droppableId as keyof typeof state.sections]
      const sortedItemIds = Array.from(destinationSection.sortedItemIds)
      sortedItemIds.splice(destination!.index, 0, draggableId)

      return {
        ...state,
        sections: {
          ...state.sections,
          [destinationSection.id]: {
            ...destinationSection,
            sortedItemIds,
          },
        },
      }
    })
  }

  const onDragEnd: OnDragEndResponder = (result, provided) => {
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
        moveSection(result, provided)
        break
      case 'ITEM':
        moveItem(result, provided)
        break
    }
  }

  return (
    <BoardProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="board" type="SECTION">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {state.sortedSectionIds.map((id, index) => (
                  <Section key={id} id={id} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </BoardProvider>
  )
}

export default Board
