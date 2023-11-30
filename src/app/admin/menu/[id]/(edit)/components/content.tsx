'use client'

import DragProvided from '@/lib/components/drag-provided'
import Identation from '@/lib/components/identation'
import RowDivider from '@/lib/components/row-divider'
import { Flex, theme } from 'antd'
import { Droppable } from 'react-beautiful-dnd'
import { useReducerState } from '../reducer/provider'
import ActionBar from './action-bar'
import BlankState from './blank-state'
import DragDropBoard, { DraggableType } from './drag-drop-board'
import MenuTitle from './menu-title'
import MenuVisibility from './menu-visibility'
import Section from './section'

const Content = () => {
  const state = useReducerState()
  const menuId = state.result
  const { sections } = state.entities.menus[menuId]
  const { token } = theme.useToken()

  return (
    <div style={{ paddingBottom: token.marginXXL * 2 }}>
      <ActionBar />
      <Identation right={token.margin}>
        <Flex align="center">
          <MenuTitle />
          <MenuVisibility />
        </Flex>
      </Identation>
      <RowDivider />
      <BlankState />
      <DragDropBoard>
        <Droppable droppableId="menu" type={DraggableType.Section}>
          {(provided, snapshot) => (
            <DragProvided provided={provided} snapshot={snapshot}>
              {sections.map((id, index) => (
                <Section key={id} id={id} index={index} />
              ))}
            </DragProvided>
          )}
        </Droppable>
      </DragDropBoard>
    </div>
  )
}

export default Content
