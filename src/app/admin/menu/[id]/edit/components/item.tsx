import { theme } from 'antd'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useReducerState } from '../provider/provider'
import DragHandle from './drag-handle'
import Identation from './identation'
import ItemDropdown from './item-dropdown'
import Product from './items/product'
import Remark from './items/remark'
import RowDivider from './row-divider'

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
              paddingTop: token.marginXS,
            }}
          >
            <DragHandle
              dragHandleProps={provided.dragHandleProps}
              iconWrapper={({ children }) => (
                <ItemDropdown itemId={id} sectionId={sectionId}>
                  {children}
                </ItemDropdown>
              )}
            />
            <Identation right={0}>{itemComponent}</Identation>
          </div>
          <RowDivider />
        </div>
      )}
    </Draggable>
  )
}

export default Item
