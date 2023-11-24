import { HolderOutlined } from '@ant-design/icons'
import { Flex, Input } from 'antd'
import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useReducerDispatch, useReducerState } from '../provider/provider'
import { Reducer } from '../provider/types'
import AddItem from './add-item'
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
          <Flex gap={4} style={{ paddingBottom: 4, position: 'relative' }}>
            <div
              {...provided.dragHandleProps}
              style={{ padding: 4, bottom: 8, position: 'absolute' }}
            >
              <HolderOutlined />
            </div>

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
          </Flex>
          <RowDivider />

          <Droppable droppableId={id} type="ITEM">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    transition: 'background-color 0.2s ease',
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
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
          <AddItem sectionId={id} />
          <RowDivider />
        </div>
      )}
    </Draggable>
  )
}

export default Section
