import DragHandle from '@/lib/components/drag-handle'
import DragProvided from '@/lib/components/drag-provided'
import Identation from '@/lib/components/identation'
import RowDivider from '@/lib/components/row-divider'
import { Flex, Input } from 'antd'
import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useReducerDispatch, useReducerState } from '../reducer/provider'
import { Reducer } from '../reducer/types'
import AddItem from './add-item'
import { DraggableType } from './drag-drop-board'
import Item from './item'
import SectionDropdown from './section-dropdown'

const Section: FC<{ id: string; index: number }> = ({ id, index }) => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const { title, items } = state.entities.sections[id]

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div style={{ background: 'white' }}>
            <Identation>
              <Flex align="flex-start">
                <Input
                  value={title}
                  size="small"
                  bordered={false}
                  placeholder="Enter section name…"
                  style={{ flex: 1, fontSize: '1.5rem' }}
                  onChange={(e) => {
                    dispatch({
                      type: Reducer.ActionType.ChangeSection,
                      payload: { id, property: 'title', value: e.target.value },
                    })
                  }}
                />
                <SectionDropdown sectionId={id} />
                <DragHandle
                  top={8}
                  dragHandleProps={provided.dragHandleProps}
                />
              </Flex>
            </Identation>

            <RowDivider />

            <Droppable droppableId={id} type={DraggableType.Item}>
              {(provided, snapshot) => (
                <DragProvided provided={provided} snapshot={snapshot}>
                  {items.map((itemId, index) => {
                    return (
                      <Item
                        id={itemId}
                        index={index}
                        key={itemId}
                        sectionId={id}
                      />
                    )
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
