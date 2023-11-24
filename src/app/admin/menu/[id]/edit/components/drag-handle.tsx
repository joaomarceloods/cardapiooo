import { HolderOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { FC } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'

const DragHandle: FC<{
  top?: number
  dragHandleProps: DraggableProvided['dragHandleProps']
}> = ({ top, dragHandleProps }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div
        {...dragHandleProps}
        style={{
          position: 'absolute',
          paddingInline: 12,
          paddingBlock: 4,
          top,
        }}
      >
        <Typography.Text type="secondary">
          <HolderOutlined />
        </Typography.Text>
      </div>
    </div>
  )
}

export default DragHandle
