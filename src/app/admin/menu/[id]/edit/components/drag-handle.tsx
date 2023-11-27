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
          top,
          width: 44,
          display: 'flex',
          position: 'absolute',
          justifyContent: 'center',
        }}
      >
        <Typography.Text type="secondary">
          <HolderOutlined style={{ fontSize: '1rem' }} />
        </Typography.Text>
      </div>
    </div>
  )
}

export default DragHandle
