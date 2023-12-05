import DragHandle from '@/lib/components/drag-handle'
import Identation from '@/lib/components/identation'
import RowDivider from '@/lib/components/row-divider'
import { Flex, theme } from 'antd'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useReducerState } from '../reducer/provider'
import ItemDropdown from './item-dropdown'
import Product from './items/product/product'
import Remark from './items/remark/remark'

const Item: FC<{ id: string; index: number; sectionId: string }> = ({
  id,
  index,
  sectionId,
}) => {
  const { token } = theme.useToken()
  const state = useReducerState()
  const { type } = state.entities.items[id]

  const itemComponent =
    type === 'product' ? (
      <Product id={id} />
    ) : type === 'remark' ? (
      <Remark id={id} />
    ) : (
      <strong>?</strong>
    )

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        // IMPORTANT!!! Don't add styles in the same div you add provided.draggableProps, or it will break drag-and-drop
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div
            style={{
              background: token.colorBgBase,
              paddingTop: token.marginXXS,
              paddingBottom: token.marginXXS,
            }}
          >
            <Identation right={token.margin}>
              <Flex gap="small" align="flex-start">
                <div style={{ flex: 1 }}>
                  <div>{itemComponent}</div>
                </div>
                <Flex>
                  <ItemDropdown itemId={id} sectionId={sectionId} />
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

export default Item
