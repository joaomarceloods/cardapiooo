import DragHandle from '@/lib/components/drag-handle'
import Identation from '@/lib/components/identation'
import RowDivider from '@/lib/components/row-divider'
import { Flex, theme } from 'antd'
import Link from 'next/link'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useReducerState } from '../reducer/provider'
import MenuVisibility from './menu-visibility'

const Menu: FC<{ id: string; index: number }> = ({ id, index }) => {
  const state = useReducerState()
  const { title } = state.entities.menus[id]
  const { token } = theme.useToken()

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        // IMPORTANT!!! Don't add styles to the same div you add provided.draggableProps, or it will break drag-and-drop
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div style={{ background: token.colorBgBase }}>
            <Identation right={token.margin}>
              <Flex style={{ fontSize: '1rem' }}>
                <Link
                  href={`/admin/menu/${id}`}
                  style={{
                    flex: 1,
                    paddingBlock: token.marginXS,
                    paddingInline: token.marginXS,
                  }}
                >
                  {title}
                </Link>
                <Flex gap="small">
                  <MenuVisibility id={id} />
                  <DragHandle dragHandleProps={provided.dragHandleProps} />
                </Flex>
              </Flex>
            </Identation>
          </div>
          <RowDivider />
        </div>
      )}
    </Draggable>
  )
}

export default Menu
