'use client'

import DragProvided from '@/lib/components/drag-provided'
import RowDivider from '@/lib/components/row-divider'
import { theme } from 'antd'
import { Droppable } from 'react-beautiful-dnd'
import { useReducerState } from '../reducer/provider'
import ActionBar from './action-bar'
import BlankState from './blank-state'
import DragDropBoard, { DraggableType } from './drag-drop-board'
import Menu from './menu'
import Title from './title'

const Content = () => {
  const state = useReducerState()
  const businessId = state.result
  const { menus } = state.entities.businesses[businessId]
  const { token } = theme.useToken()

  return (
    <>
      <ActionBar />
      <Title />
      <RowDivider />
      <BlankState />
      <DragDropBoard>
        <Droppable droppableId={DraggableType.Menu} type={DraggableType.Menu}>
          {(provided, snapshot) => (
            <DragProvided provided={provided} snapshot={snapshot}>
              {menus.map((id, index) => (
                <Menu key={id} id={id} index={index} />
              ))}
              {provided.placeholder}
            </DragProvided>
          )}
        </Droppable>
      </DragDropBoard>
    </>
  )
}

export default Content
