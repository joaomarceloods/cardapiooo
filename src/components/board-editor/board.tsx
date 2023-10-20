'use client'

import React, { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import initialData from './initial-data'
import { BoardProvider } from './board-provider'
import Product from './items/product'
import Remark from './items/remark'

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

  const onChangeSection = (
    event: React.ChangeEvent<HTMLInputElement>,
    sectionId: string
  ) => {
    setState((state) => {
      const section = state.sections[sectionId as keyof typeof state.sections]

      return {
        ...state,
        sections: {
          ...state.sections,
          [section.id]: {
            ...section,
            title: event.target.value,
          },
        },
      }
    })
  }

  const onChangeItem = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    itemId: string,
    property: string
  ) => {
    setState((state) => {
      const item = state.items[itemId as keyof typeof state.items]

      return {
        ...state,
        items: {
          ...state.items,
          [item.id]: {
            ...item,
            data: {
              ...item.data,
              [property]: event.target.value,
            },
          },
        },
      }
    })
  }

  const addItem = (sectionId: string) => {
    const section = state.sections[sectionId as keyof typeof state.sections]
    const sortedItemIds = Array.from(section.sortedItemIds)
    const newItemId = `item-${crypto.randomUUID()}`
    sortedItemIds.push(newItemId)

    setState((state) => ({
      ...state,
      sections: {
        ...state.sections,
        [section.id]: {
          ...section,
          sortedItemIds,
        },
      },
      items: {
        ...state.items,
        [newItemId]: {
          id: newItemId,
          type: 'product',
          data: {
            name: '',
          },
        },
      },
    }))
  }

  const addSection = (afterSectionId?: string) => {
    const sortedSectionIds = Array.from(state.sortedSectionIds)
    const newSectionId = `section-${crypto.randomUUID()}`

    if (afterSectionId) {
      const newSectionIndex = sortedSectionIds.indexOf(afterSectionId) + 1
      sortedSectionIds.splice(newSectionIndex, 0, newSectionId)
    } else {
      sortedSectionIds.unshift(newSectionId)
    }

    setState((state) => ({
      ...state,
      sortedSectionIds,
      sections: {
        ...state.sections,
        [newSectionId]: {
          id: newSectionId,
          title: '',
          sortedItemIds: [],
        },
      },
    }))
  }

  return (
    <BoardProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="board" type="SECTION">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {state.sortedSectionIds.map((sectionId, index) => {
                  const section =
                    state.sections[sectionId as keyof typeof state.sections]
                  const items = section.sortedItemIds.map(
                    (itemId) => state.items[itemId as keyof typeof state.items]
                  )

                  return (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <span>
                            <span {...provided.dragHandleProps}>☰</span>
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => onChangeSection(e, section.id)}
                              style={{ fontWeight: 'bold' }}
                              placeholder="Section title"
                            />
                          </span>

                          <Droppable droppableId={section.id} type="ITEM">
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  style={{
                                    transition: 'background-color 0.2s ease',
                                    paddingBottom: 20,
                                    backgroundColor: snapshot.isDraggingOver
                                      ? 'lightblue'
                                      : snapshot.draggingFromThisWith
                                      ? 'lightpink'
                                      : 'inherit',
                                  }}
                                >
                                  {items.map((item, index) => {
                                    return (
                                      <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <div
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                          >
                                            <span {...provided.dragHandleProps}>
                                              ☰
                                            </span>
                                            {item.type == 'product' ? (
                                              <Product id={item.id} />
                                            ) : item.type === 'remark' ? (
                                              <Remark id={item.id} />
                                            ) : (
                                              <>bad</>
                                            )}
                                          </div>
                                        )}
                                      </Draggable>
                                    )
                                  })}
                                  <button onClick={() => addItem(section.id)}>
                                    Add item
                                  </button>
                                  <button
                                    onClick={() => addSection(section.id)}
                                  >
                                    Add section
                                  </button>
                                  {provided.placeholder}
                                </div>
                              )
                            }}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
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
