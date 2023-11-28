import { HolderOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { FC, PropsWithChildren } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'

const JustChildren: FC<PropsWithChildren> = ({ children }) => children

const DragHandle: FC<{
  top?: number
  iconWrapper?: FC<PropsWithChildren>
  dragHandleProps: DraggableProvided['dragHandleProps']
}> = ({ top, dragHandleProps, iconWrapper: IconWrapper = JustChildren }) => {
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
        <IconWrapper>
          <Typography.Text type="secondary">
            <HolderOutlined style={{ fontSize: '1rem' }} />
          </Typography.Text>
        </IconWrapper>
      </div>
    </div>
  )
}

export default DragHandle
