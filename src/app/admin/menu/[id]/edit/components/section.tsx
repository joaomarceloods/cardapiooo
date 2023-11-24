import { Input } from 'antd'
import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'
import AddItem from './add-item'
import DragHandle from './drag-handle'
import DragProvided from './drag-provided'
import Identation from './identation'
import Item from './item'
import RowDivider from './row-divider'

const Section: FC<{ id: string; index: number }> = ({ id, index }) => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const { title, items } = state.entities.sections[id]

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div style={{ background: 'white' }}>
            <DragHandle dragHandleProps={provided.dragHandleProps} top={8} />

            <Identation>
              <Input
                value={title}
                size="small"
                bordered={false}
                placeholder="Enter section name…"
                style={{ fontSize: '1.5rem' }}
                onChange={(e) => {
                  dispatch({
                    type: Reducer.ActionType.ChangeSection,
                    payload: { id, property: 'title', value: e.target.value },
                  })
                }}
              />
            </Identation>

            <RowDivider />

            <Droppable droppableId={id} type="ITEM">
              {(provided, snapshot) => (
                <DragProvided provided={provided} snapshot={snapshot}>
                  {items.map((id, index) => {
                    return <Item id={id} index={index} key={id} />
                  })}
                </DragProvided>
              )}
            </Droppable>
            <AddItem sectionId={id} />
            <RowDivider />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Section
