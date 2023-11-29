'use client'

import RowDivider from '@/lib/components/row-divider'
import { Droppable } from 'react-beautiful-dnd'
import { useReducerState } from '../reducer/provider'
import ActionBar from './action-bar'
import DragDropBoard, { DraggableType } from './drag-drop-board'
import DragProvided from './drag-provided'
import MenuTitle from './menu-title'
import Section from './section'

const Content = () => {
  const state = useReducerState()
  const { sections } = state.entities.menus[state.result]

  return (
    <>
      <ActionBar />
      <MenuTitle />
      <RowDivider />
      {sections.length === 0 && (
        <>
          <h3>This menu is empty</h3>
          {/* TODO: add section */}
        </>
      )}
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
    </>
  )
}

export default Content
