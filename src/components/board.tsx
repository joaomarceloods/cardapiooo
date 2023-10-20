'use client'

import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from 'react-beautiful-dnd'
import initialData from './initial-data'

const Board = () => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const [state, setState] = useState(initialData)

  const moveSection: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result

    setState((state) => {
      const newSectionOrder = Array.from(state.sectionOrder)
      newSectionOrder.splice(source.index, 1)
      newSectionOrder.splice(destination!.index, 0, draggableId)

      return {
        ...state,
        sectionOrder: newSectionOrder,
      }
    })
  }

  const moveItem: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result

    // Remove item from source
    setState((state) => {
      const sourceSection =
        state.sections[source.droppableId as keyof typeof state.sections]
      const sourceItemIds = Array.from(sourceSection.itemIds)
      sourceItemIds.splice(source.index, 1)

      return {
        ...state,
        sections: {
          ...state.sections,
          [sourceSection.id]: {
            ...sourceSection,
            itemIds: sourceItemIds,
          },
        },
      }
    })

    // Add item to destination
    setState((state) => {
      const destinationSection =
        state.sections[destination!.droppableId as keyof typeof state.sections]
      const destinationItemIds = Array.from(destinationSection.itemIds)
      destinationItemIds.splice(destination!.index, 0, draggableId)

      return {
        ...state,
        sections: {
          ...state.sections,
          [destinationSection.id]: {
            ...destinationSection,
            itemIds: destinationItemIds,
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

  const onChangeProductName = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string
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
              name: event.target.value,
            },
          },
        },
      }
    })
  }

  const onChangeProductPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string
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
              price: event.target.value,
            },
          },
        },
      }
    })
  }

  const onChangeProductDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    itemId: string
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
              description: event.target.value,
            },
          },
        },
      }
    })
  }

  const onChangeMemoContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    itemId: string
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
              content: event.target.value,
            },
          },
        },
      }
    })
  }

  const addItem = (sectionId: string) => {
    const section = state.sections[sectionId as keyof typeof state.sections]
    const itemIds = Array.from(section.itemIds)
    const newItemId = `item-${crypto.randomUUID()}`
    itemIds.push(newItemId)

    setState((state) => ({
      ...state,
      sections: {
        ...state.sections,
        [section.id]: {
          ...section,
          itemIds,
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
    const sectionOrder = Array.from(state.sectionOrder)
    const newSectionId = `section-${crypto.randomUUID()}`

    if (afterSectionId) {
      sectionOrder.splice(
        sectionOrder.indexOf(afterSectionId) + 1,
        0,
        newSectionId
      )
    } else {
      sectionOrder.unshift(newSectionId)
    }

    setState((state) => ({
      ...state,
      sectionOrder,
      sections: {
        ...state.sections,
        [newSectionId]: {
          id: newSectionId,
          title: '',
          itemIds: [],
        },
      },
    }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="board" type="SECTION">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {state.sectionOrder.map((sectionId, index) => {
                const section =
                  state.sections[sectionId as keyof typeof state.sections]
                const items = section.itemIds.map(
                  (itemId) => state.items[itemId as keyof typeof state.items]
                )

                return (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided) => (
                      <div {...provided.draggableProps} ref={provided.innerRef}>
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
                                            <>
                                              <input
                                                value={
                                                  (
                                                    item.data as {
                                                      name?: string
                                                    }
                                                  ).name || ''
                                                }
                                                onChange={(e) =>
                                                  onChangeProductName(
                                                    e,
                                                    item.id
                                                  )
                                                }
                                              />
                                              <input
                                                value={
                                                  (
                                                    item.data as {
                                                      price?: string
                                                    }
                                                  ).price || ''
                                                }
                                                onChange={(e) =>
                                                  onChangeProductPrice(
                                                    e,
                                                    item.id
                                                  )
                                                }
                                              />
                                              <br/>
                                              <textarea
                                                value={
                                                  (
                                                    item.data as {
                                                      description?: string
                                                    }
                                                  ).description || ''
                                                }
                                                onChange={(e) =>
                                                  onChangeProductDescription(
                                                    e,
                                                    item.id
                                                  )
                                                }
                                              />
                                            </>
                                          ) : item.type === 'memo' ? (
                                            <>
                                              <textarea
                                                value={
                                                  (
                                                    item.data as {
                                                      content?: string
                                                    }
                                                  ).content || ''
                                                }
                                                onChange={(e) =>
                                                  onChangeMemoContent(
                                                    e,
                                                    item.id
                                                  )
                                                }
                                              />
                                            </>
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
                                <button onClick={() => addSection(section.id)}>
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
  )
}

export default Board
