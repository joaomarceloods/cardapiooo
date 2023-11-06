import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'
import Item from './item'

const Section: FC<{ id: string; index: number }> = ({ id, index }) => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const { title, items } = state.entities.sections[id]

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <span>
            <span {...provided.dragHandleProps}>☰</span>
            <input
              type="text"
              value={title}
              style={{ fontWeight: 'bold' }}
              placeholder="Section title"
              onChange={(e) => {
                dispatch({
                  type: Reducer.ActionType.ChangeSection,
                  payload: { id, property: 'title', value: e.target.value },
                })
              }}
            />
          </span>

          <Droppable droppableId={id} type="ITEM">
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
                  {items.map((id, index) => {
                    return <Item id={id} index={index} key={id} />
                  })}
                  <button
                    onClick={() =>
                      dispatch({
                        type: Reducer.ActionType.AddItem,
                        payload: { sectionId: id },
                      })
                    }
                  >
                    Add item
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: Reducer.ActionType.AddSection,
                        payload: { afterSectionId: id },
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
