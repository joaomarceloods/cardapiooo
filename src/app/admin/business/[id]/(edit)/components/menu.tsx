import DragHandle from '@/lib/components/drag-handle'
import Identation from '@/lib/components/identation'
import RowDivider from '@/lib/components/row-divider'
import { RightOutlined } from '@ant-design/icons'
import { Flex, Space, theme } from 'antd'
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
          <div
            style={{
              background: token.colorBgBase,
              paddingBlock: token.marginXS,
            }}
          >
            <DragHandle dragHandleProps={provided.dragHandleProps} />
            <Identation right={token.margin}>
              <Flex justify="space-between" style={{ fontSize: '1rem' }}>
                <Space>
                  <MenuVisibility id={id} />
                  {title}
                </Space>
                <Link href={`/admin/menu/${id}`}>
                  <Space>
                    Edit
                    <RightOutlined />
                  </Space>
                </Link>
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
