import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useMenuEditor, useMenuEditorDispatch } from '../provider/provider'
import { MenuEditorActionType } from '../provider/types'
import Product from './items/product'
import Remark from './items/remark'

const Section: FC<{ id: string; index: number }> = ({ id, index }) => {
  const state = useMenuEditor()
  const dispatch = useMenuEditorDispatch()
  const section = state.entities.sections[id]

  return (
    <Draggable key={section.id} draggableId={section.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <span>
            <span {...provided.dragHandleProps}>☰</span>
            <input
              type="text"
              value={section.title}
              style={{ fontWeight: 'bold' }}
              placeholder="Section title"
              onChange={(e) => {
                dispatch({
                  type: MenuEditorActionType.ChangeSection,
                  payload: { id, property: 'title', value: e.target.value },
                })
              }}
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
                  {section.sortedItemIds.map((id, index) => {
                    const item = state.entities.items[id]
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
                            <span {...provided.dragHandleProps}>☰</span>
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
                  <button
                    onClick={() =>
                      dispatch({
                        type: MenuEditorActionType.AddItem,
                        payload: { sectionId: section.id },
                      })
                    }
                  >
                    Add item
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: MenuEditorActionType.AddSection,
                        payload: { afterSectionId: section.id },
                      })
                    }
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
}

export default Section
